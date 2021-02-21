import { EmployersController } from './controllers/employer.controller';
import { Module } from '@nestjs/common';
import { EmployerService } from './services/employer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employer } from './entities/employer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employer])],
  controllers: [EmployersController],
  providers: [EmployerService],
})
export class EmployersModule {}
