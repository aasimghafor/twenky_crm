import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FeatureFlagModule } from 'src/engine/core-modules/feature-flag/feature-flag.module';
import { Workspace } from 'src/engine/core-modules/workspace/workspace.entity';
import { DataSourceEntity } from 'src/engine/metadata-modules/data-source/data-source.entity';
import { ObjectMetadataEntity } from 'src/engine/metadata-modules/object-metadata/object-metadata.entity';
import { WorkspaceDataSourceModule } from 'src/engine/workspace-datasource/workspace-datasource.module';
import { WorkspaceEventEmitterModule } from 'src/engine/workspace-event-emitter/workspace-event-emitter.module';
import { EmailAliasManagerModule } from 'src/modules/connected-account/email-alias-manager/email-alias-manager.module';
import { RefreshTokensManagerModule } from 'src/modules/connected-account/refresh-tokens-manager/connected-account-refresh-tokens-manager.module';
import { MessagingCommonModule } from 'src/modules/messaging/common/messaging-common.module';
import { MessagingMessageCleanerModule } from 'src/modules/messaging/message-cleaner/messaging-message-cleaner.module';
import { MessagingSingleMessageImportCommand } from 'src/modules/messaging/message-import-manager/commands/messaging-single-message-import.command';
import { MessagingMessageListFetchCronCommand } from 'src/modules/messaging/message-import-manager/crons/commands/messaging-message-list-fetch.cron.command';
import { MessagingMessagesImportCronCommand } from 'src/modules/messaging/message-import-manager/crons/commands/messaging-messages-import.cron.command';
import { MessagingOngoingStaleCronCommand } from 'src/modules/messaging/message-import-manager/crons/commands/messaging-ongoing-stale.cron.command';
import { MessagingMessageListFetchCronJob } from 'src/modules/messaging/message-import-manager/crons/jobs/messaging-message-list-fetch.cron.job';
import { MessagingMessagesImportCronJob } from 'src/modules/messaging/message-import-manager/crons/jobs/messaging-messages-import.cron.job';
import { MessagingOngoingStaleCronJob } from 'src/modules/messaging/message-import-manager/crons/jobs/messaging-ongoing-stale.cron.job';
import { MessagingGmailDriverModule } from 'src/modules/messaging/message-import-manager/drivers/gmail/messaging-gmail-driver.module';
import { MessagingIMAPDriverModule } from 'src/modules/messaging/message-import-manager/drivers/imap/messaging-imap-driver.module';
import { MessagingMicrosoftDriverModule } from 'src/modules/messaging/message-import-manager/drivers/microsoft/messaging-microsoft-driver.module';
import { MessagingSmtpDriverModule } from 'src/modules/messaging/message-import-manager/drivers/smtp/messaging-smtp-driver.module';
import { MessagingAddSingleMessageToCacheForImportJob } from 'src/modules/messaging/message-import-manager/jobs/messaging-add-single-message-to-cache-for-import.job';
import { MessagingCleanCacheJob } from 'src/modules/messaging/message-import-manager/jobs/messaging-clean-cache';
import { MessagingMessageListFetchJob } from 'src/modules/messaging/message-import-manager/jobs/messaging-message-list-fetch.job';
import { MessagingMessagesImportJob } from 'src/modules/messaging/message-import-manager/jobs/messaging-messages-import.job';
import { MessagingOngoingStaleJob } from 'src/modules/messaging/message-import-manager/jobs/messaging-ongoing-stale.job';
import { MessagingMessageImportManagerMessageChannelListener } from 'src/modules/messaging/message-import-manager/listeners/messaging-import-manager-message-channel.listener';
import { MessagingAccountAuthenticationService } from 'src/modules/messaging/message-import-manager/services/messaging-account-authentication.service';
import { MessagingCursorService } from 'src/modules/messaging/message-import-manager/services/messaging-cursor.service';
import { MessagingGetMessageListService } from 'src/modules/messaging/message-import-manager/services/messaging-get-message-list.service';
import { MessagingGetMessagesService } from 'src/modules/messaging/message-import-manager/services/messaging-get-messages.service';
import { MessageImportExceptionHandlerService } from 'src/modules/messaging/message-import-manager/services/messaging-import-exception-handler.service';
import { MessagingMessageListFetchService } from 'src/modules/messaging/message-import-manager/services/messaging-message-list-fetch.service';
import { MessagingMessageService } from 'src/modules/messaging/message-import-manager/services/messaging-message.service';
import { MessagingMessagesImportService } from 'src/modules/messaging/message-import-manager/services/messaging-messages-import.service';
import { MessagingSaveMessagesAndEnqueueContactCreationService } from 'src/modules/messaging/message-import-manager/services/messaging-save-messages-and-enqueue-contact-creation.service';
import { MessagingSendMessageService } from 'src/modules/messaging/message-import-manager/services/messaging-send-message.service';
import { MessageParticipantManagerModule } from 'src/modules/messaging/message-participant-manager/message-participant-manager.module';
import { MessagingMonitoringModule } from 'src/modules/messaging/monitoring/messaging-monitoring.module';
@Module({
  imports: [
    RefreshTokensManagerModule,
    WorkspaceDataSourceModule,
    MessagingGmailDriverModule,
    MessagingMicrosoftDriverModule,
    MessagingIMAPDriverModule,
    MessagingSmtpDriverModule,
    MessagingCommonModule,
    TypeOrmModule.forFeature(
      [Workspace, DataSourceEntity, ObjectMetadataEntity],
      'core',
    ),
    EmailAliasManagerModule,
    FeatureFlagModule,
    MessageParticipantManagerModule,
    MessagingMonitoringModule,
    MessagingMessageCleanerModule,
    WorkspaceEventEmitterModule,
  ],
  providers: [
    MessagingMessageListFetchCronCommand,
    MessagingMessagesImportCronCommand,
    MessagingOngoingStaleCronCommand,
    MessagingSingleMessageImportCommand,
    MessagingMessageListFetchJob,
    MessagingMessagesImportJob,
    MessagingOngoingStaleJob,
    MessagingMessageListFetchCronJob,
    MessagingMessagesImportCronJob,
    MessagingOngoingStaleCronJob,
    MessagingAddSingleMessageToCacheForImportJob,
    MessagingMessageImportManagerMessageChannelListener,
    MessagingCleanCacheJob,
    MessagingMessageService,
    MessagingMessageListFetchService,
    MessagingMessagesImportService,
    MessagingSaveMessagesAndEnqueueContactCreationService,
    MessagingGetMessageListService,
    MessagingGetMessagesService,
    MessageImportExceptionHandlerService,
    MessagingCursorService,
    MessagingSendMessageService,
    MessagingAccountAuthenticationService,
  ],
  exports: [
    MessagingSendMessageService,
    MessagingMessageListFetchCronCommand,
    MessagingMessagesImportCronCommand,
    MessagingOngoingStaleCronCommand,
  ],
})
export class MessagingImportManagerModule {}
