import { Injectable, NotFoundException } from '@nestjs/common';
import { AgentRepository } from './agent.repository';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';

@Injectable()
export class AgentsService {
  constructor(private agentRepository: AgentRepository) {}
  create(createAgentDto: CreateAgentDto) {
    return this.agentRepository.addAgent(createAgentDto);
  }

  findAll() {
    return `This action returns all agents`;
  }
  async findOne(id: number) {
    const company = await this.agentRepository.findOne({ where: { id } });
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return company;
  }

  async update(id: number, updateAgentDto: UpdateAgentDto) {
    const agent = await this.findOne(id);
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
