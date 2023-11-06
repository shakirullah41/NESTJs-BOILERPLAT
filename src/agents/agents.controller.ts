import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';

@Controller('agent')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image' }, { name: 'sideProfilePhoto' }]),
  )
  create(
    @Body() createAgentDto: CreateAgentDto,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      sideProfilePhoto?: Express.Multer.File[];
    },
  ) {
    return this.agentsService.create(createAgentDto, files);
  }

  @Get()
  findAll() {
    return this.agentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agentsService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image' }, { name: 'sideProfilePhoto' }]),
  )
  update(
    @Param('id') id: string,
    @Body() updateAgentDto: UpdateAgentDto,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      sideProfilePhoto?: Express.Multer.File[];
    },
  ) {
    return this.agentsService.update(+id, updateAgentDto, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agentsService.remove(+id);
  }
}
