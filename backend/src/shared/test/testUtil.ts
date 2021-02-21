import { CreateEmployerDTO } from 'src/modules/employers/dtos/employer.dto';
import { Employer } from 'src/modules/employers/entities/employer.entity';

export const mockAddEmployerParams: CreateEmployerDTO = {
  name: 'João',
  age: 22,
  role: 'Gerente de projetos',
};

export const mockUpdateEmployerParams: CreateEmployerDTO = {
  ...mockAddEmployerParams,
  role: 'Operador de empilhadeira',
};

export const mockEmployerModel: Employer = {
  ...mockAddEmployerParams,
  id: 'teste-uuid',
  updated_at: new Date('2021-01-29'),
  created_at: new Date('2021-01-29'),
};

export const mockUpdatedEmployerModel: Employer = {
  ...mockUpdateEmployerParams,
  id: 'teste-uuid',
  updated_at: new Date('2021-01-29'),
  created_at: new Date('2021-01-29'),
};

export const mockEmployersArray: Employer[] = [
  mockEmployerModel,
  mockEmployerModel,
  mockEmployerModel,
];
