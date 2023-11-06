import { Module } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { AgentsController } from './agents.controller';
import { Agent } from './entities/agent.entity';
import { AgentRepository } from './agent.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [
    AwsModule,
    // MulterModule.register({
    //   dest: './upload',
    // }),
    TypeOrmModule.forFeature([Agent]),
  ],
  controllers: [AgentsController],
  providers: [AgentsService, AgentRepository],
})
export class AgentsModule {}
