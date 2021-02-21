import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CreateEmployerDTO } from '../dtos/employer.dto';
import { Employer } from '../entities/employer.entity';
import { EmployerService } from '../services/employer.service';

@Controller('employers')
export class EmployersController {
  constructor(private employerService: EmployerService) {}
  @Post()
  @HttpCode(201)
  async createEmployer(
    @Body(new ValidationPipe()) data: CreateEmployerDTO,
  ): Promise<Employer> {
    return await this.employerService.createEmployer(data);
  }

  @Get()
  async listEmployers() {
    return await this.employerService.listEmployers();
  }

  @Get(':id')
  async getEmployer(@Param('id') id: string) {
    return await this.employerService.getEmployer(id);
  }

  @Put(':id')
  async updateEmployer(
    @Param('id') id: string,
    @Body() data: CreateEmployerDTO,
  ): Promise<Employer> {
    return await this.employerService.updateEmployer(id, data);
  }

  @Delete(':id')
  async deleteEmployer(@Param('id') id: string): Promise<void> {
    return await this.employerService.deleteEmployer(id);
  }
}
