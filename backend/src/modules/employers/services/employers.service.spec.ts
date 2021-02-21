import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Employer } from '../entities/employer.entity';
import { EmployerService } from './employer.service';
import {
  mockEmployerModel,
  mockAddEmployerParams,
  mockEmployersArray,
  mockUpdatedEmployerModel,
  mockUpdateEmployerParams,
} from '../../../shared/test/testUtil';
import { NotFoundException } from '@nestjs/common';

describe('EmployerService', () => {
  let service: EmployerService;

  const mockRepository = {
    find: jest.fn().mockReturnValue(mockEmployersArray),
    findOne: jest.fn().mockReturnValue(mockEmployerModel),
    create: jest.fn().mockReturnValue(mockEmployerModel),
    save: jest.fn().mockReturnValue(mockEmployerModel),
    delete: jest.fn().mockRejectedValue({ affected: 1 }),
    update: jest.fn().mockReturnValue(mockUpdatedEmployerModel),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployerService,
        {
          provide: getRepositoryToken(Employer),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<EmployerService>(EmployerService);
  });

  it('Shoud be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Employers', () => {
    describe('Create a Employer', () => {
      it('should be create a new employer when recieve a valid params', () => {
        const employer = service.createEmployer(mockAddEmployerParams);

        expect(employer).resolves.toBe(mockEmployerModel);
        expect(mockRepository.create).toHaveBeenCalledTimes(1);
      });
    });
    describe('List Employers', () => {
      it('should be list all employers', async () => {
        const employers = await service.listEmployers();

        expect(employers).toBe(mockEmployersArray);
        expect(mockRepository.find).toHaveBeenCalledTimes(1);
      });
    });
    describe('Get a employer', () => {
      it('should be return a employer when recieve a valid id', async () => {
        const employer = await service.getEmployer(mockEmployerModel.id);

        expect(employer).toBe(mockEmployerModel);
        expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      });

      it('should be able return a exception when not found a employer', async () => {
        mockRepository.findOne.mockReturnValue(null);

        await expect(service.getEmployer(mockEmployerModel.id)).rejects.toThrow(
          NotFoundException,
        );
        expect(mockRepository.findOne).toHaveBeenCalledWith({
          where: { id: mockEmployerModel.id },
        });
      });
    });

    describe('Update a employer', () => {
      it('should update a employer', async () => {
        service.getEmployer = jest.fn().mockReturnValueOnce(mockEmployerModel);
        const updateEmployer = service.updateEmployer(
          mockUpdatedEmployerModel.id,
          mockUpdateEmployerParams,
        );

        expect(service.getEmployer).toHaveBeenCalledWith(mockEmployerModel.id);
        expect(updateEmployer).resolves.toStrictEqual(mockUpdatedEmployerModel);
      });

      it('should be able return a exception when try update not found a employer', async () => {
        mockRepository.findOne.mockReturnValue(null);

        await expect(
          service.updateEmployer(
            mockEmployerModel.id,
            mockUpdateEmployerParams,
          ),
        ).rejects.toThrow(NotFoundException);
        expect(mockRepository.findOne).toHaveBeenCalledWith({
          where: { id: mockEmployerModel.id },
        });
      });
    });

    describe('Delete employer', () => {
      it('should delete a employer when recieve  a valid id', async () => {
        service.getEmployer = jest.fn().mockReturnValueOnce(mockEmployerModel);
        mockRepository.delete.mockReturnValueOnce(null);

        await service.deleteEmployer(mockEmployerModel.id);

        expect(service.getEmployer).toHaveBeenCalledWith(mockEmployerModel.id);
        expect(mockRepository.delete).toBeCalledWith(mockEmployerModel);
      });

      it('should return a exception when recieve a invalid id', async () => {
        mockRepository.findOne.mockReturnValue(null);
        await expect(
          service.deleteEmployer(mockEmployerModel.id),
        ).rejects.toThrow(NotFoundException);
      });
    });
  });
});
