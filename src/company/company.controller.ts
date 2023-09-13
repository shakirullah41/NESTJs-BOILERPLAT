import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(
    @GetUser() user,
    @Body(new ValidationPipe()) createCompanyDto: CreateCompanyDto,
  ) {
    return this.companyService.create(user, createCompanyDto);
  }

  @Get()
  findAll(@GetUser() user) {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Put(':id')
  async update(
    @GetUser() user,
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.update(user, +id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@GetUser() user, @Param('id') id: string) {
    return this.companyService.remove(user, +id);
  }
}
