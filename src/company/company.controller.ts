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
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { Public } from '../auth/decorator/public.decorator';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { GetCompanyDto } from './dto/get-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Public()
  @Post()
  @UseInterceptors(FileInterceptor('logo'))
  async create(
    @GetUser() user,
    @UploadedFile() logo: Express.Multer.File,
    @Body(new ValidationPipe()) createCompanyDto: CreateCompanyDto,
  ) {
    return this.companyService.create(user, createCompanyDto, logo);
  }

  @Public()
  @Get('distinct-monthly-card-turnovers')
  async findDistinctMonthlyCardTurnovers(): Promise<number[]> {
    return this.companyService.findDistinctMonthlyCardTurnovers();
  }

  @Public()
  @Get()
  findAll(@GetUser() user, @Query() getCompanyDto: GetCompanyDto) {
    return this.companyService.findAll(getCompanyDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('logo'))
  async update(
    @GetUser() user,
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateCompanyDto: UpdateCompanyDto,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    return this.companyService.update(user, +id, updateCompanyDto, logo);
  }

  @Delete(':id')
  remove(@GetUser() user, @Param('id') id: string) {
    return this.companyService.remove(user, +id);
  }
}
