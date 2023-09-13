import { Injectable } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { Company } from "./entities/company.entity";

@Injectable()
export class CompanyRepository extends Repository<Company> {
  constructor(private dataSource: DataSource) {
    super(Company, dataSource.createEntityManager());
  }
}