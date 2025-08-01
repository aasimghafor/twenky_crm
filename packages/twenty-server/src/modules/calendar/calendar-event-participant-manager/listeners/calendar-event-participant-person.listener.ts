import { Injectable } from '@nestjs/common';

import { isDefined } from 'twenty-shared/utils';

import { OnDatabaseBatchEvent } from 'src/engine/api/graphql/graphql-query-runner/decorators/on-database-batch-event.decorator';
import { DatabaseEventAction } from 'src/engine/api/graphql/graphql-query-runner/enums/database-event-action';
import { ObjectRecordCreateEvent } from 'src/engine/core-modules/event-emitter/types/object-record-create.event';
import { ObjectRecordDeleteEvent } from 'src/engine/core-modules/event-emitter/types/object-record-delete.event';
import { ObjectRecordUpdateEvent } from 'src/engine/core-modules/event-emitter/types/object-record-update.event';
import { objectRecordChangedProperties as objectRecordUpdateEventChangedProperties } from 'src/engine/core-modules/event-emitter/utils/object-record-changed-properties.util';
import { InjectMessageQueue } from 'src/engine/core-modules/message-queue/decorators/message-queue.decorator';
import { MessageQueue } from 'src/engine/core-modules/message-queue/message-queue.constants';
import { MessageQueueService } from 'src/engine/core-modules/message-queue/services/message-queue.service';
import { WorkspaceEventBatch } from 'src/engine/workspace-event-emitter/types/workspace-event.type';
import {
  CalendarEventParticipantMatchParticipantJob,
  CalendarEventParticipantMatchParticipantJobData,
} from 'src/modules/calendar/calendar-event-participant-manager/jobs/calendar-event-participant-match-participant.job';
import {
  CalendarEventParticipantUnmatchParticipantJob,
  CalendarEventParticipantUnmatchParticipantJobData,
} from 'src/modules/calendar/calendar-event-participant-manager/jobs/calendar-event-participant-unmatch-participant.job';
import { computeChangedAdditionalEmails } from 'src/modules/contact-creation-manager/utils/compute-changed-additional-emails';
import { hasPrimaryEmailChanged } from 'src/modules/contact-creation-manager/utils/has-primary-email-changed';
import { PersonWorkspaceEntity } from 'src/modules/person/standard-objects/person.workspace-entity';

@Injectable()
export class CalendarEventParticipantPersonListener {
  constructor(
    @InjectMessageQueue(MessageQueue.calendarQueue)
    private readonly messageQueueService: MessageQueueService,
  ) {}

  @OnDatabaseBatchEvent('person', DatabaseEventAction.CREATED)
  async handleCreatedEvent(
    payload: WorkspaceEventBatch<
      ObjectRecordCreateEvent<PersonWorkspaceEntity>
    >,
  ) {
    for (const eventPayload of payload.events) {
      const jobPromises: Promise<void>[] = [];

      if (isDefined(eventPayload.properties.after.emails?.primaryEmail)) {
        // TODO: modify this job to take an array of participants to match
        jobPromises.push(
          this.messageQueueService.add<CalendarEventParticipantMatchParticipantJobData>(
            CalendarEventParticipantMatchParticipantJob.name,
            {
              workspaceId: payload.workspaceId,
              email: eventPayload.properties.after.emails?.primaryEmail,
              isPrimaryEmail: true,
              personId: eventPayload.recordId,
            },
          ),
        );
      }

      const additionalEmails =
        eventPayload.properties.after.emails?.additionalEmails;

      if (Array.isArray(additionalEmails)) {
        const additionalEmailPromises = additionalEmails.map((email) =>
          this.messageQueueService.add<CalendarEventParticipantMatchParticipantJobData>(
            CalendarEventParticipantMatchParticipantJob.name,
            {
              workspaceId: payload.workspaceId,
              email: email,
              isPrimaryEmail: false,
              personId: eventPayload.recordId,
            },
          ),
        );

        jobPromises.push(...additionalEmailPromises);
      }

      await Promise.all(jobPromises);
    }
  }

  @OnDatabaseBatchEvent('person', DatabaseEventAction.UPDATED)
  async handleUpdatedEvent(
    payload: WorkspaceEventBatch<
      ObjectRecordUpdateEvent<PersonWorkspaceEntity>
    >,
  ) {
    for (const eventPayload of payload.events) {
      if (
        objectRecordUpdateEventChangedProperties(
          eventPayload.properties.before,
          eventPayload.properties.after,
        ).includes('emails')
      ) {
        if (!isDefined(eventPayload.properties.diff)) {
          continue;
        }

        const jobPromises: Promise<void>[] = [];

        if (hasPrimaryEmailChanged(eventPayload.properties.diff)) {
          if (eventPayload.properties.before.emails?.primaryEmail) {
            jobPromises.push(
              this.messageQueueService.add<CalendarEventParticipantUnmatchParticipantJobData>(
                CalendarEventParticipantUnmatchParticipantJob.name,
                {
                  workspaceId: payload.workspaceId,
                  email: eventPayload.properties.before.emails?.primaryEmail,
                  personId: eventPayload.recordId,
                },
              ),
            );
          }

          if (eventPayload.properties.after.emails?.primaryEmail) {
            jobPromises.push(
              this.messageQueueService.add<CalendarEventParticipantMatchParticipantJobData>(
                CalendarEventParticipantMatchParticipantJob.name,
                {
                  workspaceId: payload.workspaceId,
                  email: eventPayload.properties.after.emails?.primaryEmail,
                  isPrimaryEmail: true,
                  personId: eventPayload.recordId,
                },
              ),
            );
          }
        }

        const { addedAdditionalEmails, removedAdditionalEmails } =
          computeChangedAdditionalEmails(eventPayload.properties.diff);

        const removedEmailPromises = removedAdditionalEmails
          ?.filter((email: string) => isDefined(email))
          .map((email) =>
            this.messageQueueService.add<CalendarEventParticipantUnmatchParticipantJobData>(
              CalendarEventParticipantUnmatchParticipantJob.name,
              {
                workspaceId: payload.workspaceId,
                email: email,
                personId: eventPayload.recordId,
              },
            ),
          );

        const addedEmailPromises = addedAdditionalEmails.map((email) =>
          this.messageQueueService.add<CalendarEventParticipantMatchParticipantJobData>(
            CalendarEventParticipantMatchParticipantJob.name,
            {
              workspaceId: payload.workspaceId,
              email: email,
              isPrimaryEmail: false,
              personId: eventPayload.recordId,
            },
          ),
        );

        jobPromises.push(...removedEmailPromises, ...addedEmailPromises);

        await Promise.all(jobPromises);
      }
    }
  }

  @OnDatabaseBatchEvent('person', DatabaseEventAction.DESTROYED)
  async handleDestroyedEvent(
    payload: WorkspaceEventBatch<
      ObjectRecordDeleteEvent<PersonWorkspaceEntity>
    >,
  ) {
    for (const eventPayload of payload.events) {
      if (isDefined(eventPayload.properties.before.emails?.primaryEmail)) {
        await this.messageQueueService.add<CalendarEventParticipantUnmatchParticipantJobData>(
          CalendarEventParticipantUnmatchParticipantJob.name,
          {
            workspaceId: payload.workspaceId,
            email: eventPayload.properties.before.emails?.primaryEmail,
            personId: eventPayload.recordId,
          },
        );
      }

      const additionalEmails =
        eventPayload.properties.before.emails?.additionalEmails;

      if (Array.isArray(additionalEmails)) {
        const additionalEmailPromises = additionalEmails
          ?.filter((email: string) => isDefined(email))
          .map((email) =>
            this.messageQueueService.add<CalendarEventParticipantUnmatchParticipantJobData>(
              CalendarEventParticipantUnmatchParticipantJob.name,
              {
                workspaceId: payload.workspaceId,
                email: email,
                personId: eventPayload.recordId,
              },
            ),
          );

        await Promise.all(additionalEmailPromises);
      }
    }
  }
}
