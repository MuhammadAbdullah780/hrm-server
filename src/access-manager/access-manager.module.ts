import { Module } from '@nestjs/common';
import { AccessManagerController } from './access-manager.controller';
import { AccessManagerService } from './access-manager.service';
import { AccessManagerHandlers } from './handlers';

@Module({
  controllers: [AccessManagerController],
  providers: [AccessManagerService, ...AccessManagerHandlers],
})
export class AccessManagerModule {}
