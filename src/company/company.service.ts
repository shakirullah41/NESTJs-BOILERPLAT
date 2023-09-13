import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}
  async create(user, createCompanyDto: CreateCompanyDto) {
    const company = this.companyRepository.create({
      ...createCompanyDto,
      userId: user?.id || null,
    });
    return this.companyRepository.save(company);
  }

  findAll() {
    return this.companyRepository.find();
  }

  async findOne(id: number) {
    const company = await this.companyRepository.findOne({ where: { id } });
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return company;
  }

  async update(user, id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.findOne(id);

    this.companyRepository.merge(company, {
      ...updateCompanyDto,
      userId: user?.id || null,
    });
    return this.companyRepository.save(company);
  }

  async remove(user, id: number) {
    const company = await this.companyRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    await this.companyRepository.remove(company);
  }
}
