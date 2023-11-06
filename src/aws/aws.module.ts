import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsProvider } from './aws.provider';
import { AwsService } from './aws.service';

@Module({
  imports: [ConfigModule],
  providers: [AwsProvider, AwsService],
  exports: [AwsService],
})
export class AwsModule {}
