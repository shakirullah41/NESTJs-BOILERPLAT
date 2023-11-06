import { Injectable, NotFoundException } from '@nestjs/common';
import { AwsService } from '../aws/aws.service';
import { AgentRepository } from './agent.repository';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';

@Injectable()
export class AgentsService {
  constructor(
    private agentRepository: AgentRepository,
    private awsService: AwsService,
  ) {}
  async create(createAgentDto: CreateAgentDto, files) {
    if (files) {
      const { image, sideProfilePhoto } = files;
      if (image) {
        createAgentDto.imageUrl = await this.upload(image[0]);
      }
      if (sideProfilePhoto) {
        createAgentDto.sideProfileImageUrl = await this.upload(
          sideProfilePhoto[0],
        );
      }
    }
    return this.agentRepository.addAgent(createAgentDto);
  }

  findAll() {
    return this.agentRepository.find();
  }
  async findOne(id: number) {
    const company = await this.agentRepository.findOne({ where: { id } });
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return company;
  }
  async upload(file) {
    console.log(file);
    const { buffer, mimetype } = file;
    const fileKey = `${Math.random()}-${new Date().getTime()}`;
    const { Location } = await this.awsService.s3Upload(
      buffer,
      fileKey,
      'binary',
      mimetype,
    );
    return Location;
  }
  async update(id: number, updateAgentDto: UpdateAgentDto, files) {
    const agent = await this.findOne(id);
    if (files) {
      const { image, sideProfilePhoto } = files;
      if (image) {
        updateAgentDto.imageUrl = await this.upload(image[0]);
      }
      if (sideProfilePhoto) {
        updateAgentDto.sideProfileImageUrl = await this.upload(
          sideProfilePhoto[0],
        );
      }
    }
    this.agentRepository.merge(agent, {
      ...updateAgentDto,
    });
    return this.agentRepository.save(agent);
  }

  async remove(id: number) {
    const company = await this.findOne(id);
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    await this.agentRepository.remove(company);
  }
}
