import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Agent } from './entities/agent.entity';
import { CreateAgentDto } from './dto/create-agent.dto';
@Injectable()
export class AgentRepository extends Repository<Agent> {
  constructor(private dataSource: DataSource) {
    super(Agent, dataSource.createEntityManager());
  }

  async addAgent(CreateAgentDto: CreateAgentDto): Promise<Agent> {
    // type promise bcz it is an asyn method
    const {
      name,
      email,
      designation,
      experience,
      specialization,
      language,
      phoneNumber,
      description,
      imageUrl,
      whatsappNumber,
      sideProfileImageUrl,
    } = CreateAgentDto;
    const user = new Agent();
    user.name = name;
    user.email = email;

    user.designation = designation;
    user.experience = experience;
    user.specialization = specialization;
    user.language = language;
    user.phoneNumber = phoneNumber;
    user.description = description;
    user.imageUrl = imageUrl;
    user.whatsappNumber = whatsappNumber;
    user.sideProfileImageUrl = sideProfileImageUrl;

    if (await this.findOne({ where: { email } })) {
      throw new ConflictException('Email already exist!');
    }
    try {
      await this.save(user);
    } catch (e) {
      if (['23505', '23503', '23502', '23514'].includes(e.code)) {
        throw new ConflictException(e.detail);
      } else {
        throw new InternalServerErrorException(e);
      }
    }
    return user;
  }

  updateAgent(CreateAgentDto: CreateAgentDto){

  }
}
