import { ListSymptomRecordUseCase } from '../../../src/application/use-case/symptom-record/list-symptom-record.usecase';
import { RegisterSymptomRecordUseCase } from '../../../src/application/use-case/symptom-record/register-symptom-record.usecase';

export const createRegisterSymptomRecordUseCaseMock = (): jest.Mocked<RegisterSymptomRecordUseCase> =>
  ({ execute: jest.fn() } as unknown) as jest.Mocked<RegisterSymptomRecordUseCase>;

export const createListSymptomRecordUseCaseMock = (): jest.Mocked<ListSymptomRecordUseCase> =>
  ({ execute: jest.fn() } as unknown) as jest.Mocked<ListSymptomRecordUseCase>;
