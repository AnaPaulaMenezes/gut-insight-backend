import { SymptomRecordRepository } from '../../../src/domain/repository/symptom-record.repository';

export const createSymptomRecordRepositoryMock = (): jest.Mocked<SymptomRecordRepository> => ({
  save: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  findByFilter: jest.fn(),
  deleteById: jest.fn(),
});
