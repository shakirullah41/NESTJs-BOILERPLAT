import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { CreateCompanyDto } from './dto/create-company.dto';
import { GetCompanyDto } from './dto/get-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}
  async create(user, createCompanyDto: CreateCompanyDto, logo) {
    const company = this.companyRepository.create({
      ...createCompanyDto,
      userId: user?.id || null,
    });
    if (logo) {
      company.logo = logo.buffer; // Store file data as needed
    }
    return this.companyRepository.save(company);
  }

  findAll(getCompanyDto: GetCompanyDto) {
    const { monthlyCardTurnover } = getCompanyDto;
    let where;
    if (monthlyCardTurnover) {
      where = { monthlyCardTurnover };
    }
    return this.companyRepository.find({ where });
  }
  async findDistinctMonthlyCardTurnovers(): Promise<number[]> {
    const distinctValues = await this.companyRepository
      .createQueryBuilder()
      .select('DISTINCT "monthlyCardTurnover"', 'monthlyCardTurnover')
      .getRawMany();

    return distinctValues.map((entry) => entry.monthlyCardTurnover);
  }
  async findOne(id: number) {
    const company = await this.companyRepository.findOne({ where: { id } });
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return company;
  }

  async update(user, id: number, updateCompanyDto: UpdateCompanyDto, logo) {
    const company = await this.findOne(id);
    if (logo) {
      company.logo = logo.buffer; // Store file data as needed
    }
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
