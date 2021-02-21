import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployerDTO } from '../dtos/employer.dto';
import { Employer } from '../entities/employer.entity';

@Injectable()
export class EmployerService {
  constructor(
    @InjectRepository(Employer)
    private employerRepository: Repository<Employer>,
  ) {}
  async listEmployers(): Promise<Employer[]> {
    const employers = await this.employerRepository.find();

    return employers;
  }
  async getEmployer(id: string): Promise<Employer> {
    const employer = await this.employerRepository.findOne({ where: { id } });

    if (!employer) {
      throw new NotFoundException('Employer not found');
    }

    return employer;
  }
  async createEmployer(newEmployer: CreateEmployerDTO): Promise<Employer> {
    const employer = this.employerRepository.create(newEmployer);

    await this.employerRepository.save(employer);

    return employer;
  }
  async updateEmployer(
    id: string,
    { name, role, age }: CreateEmployerDTO,
  ): Promise<Employer> {
    const employer = await this.getEmployer(id);

    if (!employer) {
      throw new NotFoundException('Employer does not exists');
    }

    employer.name = name;
    employer.age = age;
    employer.role = role;

    return this.employerRepository.save(employer);
  }

  async deleteEmployer(id: string): Promise<void> {
    await this.getEmployer(id);

    await this.employerRepository.delete(id);
  }
}
