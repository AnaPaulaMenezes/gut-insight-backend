import { ListSymptomRecordUseCase } from '../../../src/application/use-case/symptom-record/list-symptom-record.usecase';
import { RegisterSymptomRecordUseCase } from '../../../src/application/use-case/symptom-record/register-symptom-record.usecase';
import { UpdateSymptomRecordUseCase } from '../../../src/application/use-case/symptom-record/update-symptom-record.usecase';
import { DeleteSymptomRecordUseCase } from '../../../src/application/use-case/symptom-record/delete-symptom-record.usecase';

export const createRegisterSymptomRecordUseCaseMock = (): jest.Mocked<RegisterSymptomRecordUseCase> =>
  ({ execute: jest.fn() } as unknown) as jest.Mocked<RegisterSymptomRecordUseCase>;

export const createListSymptomRecordUseCaseMock = (): jest.Mocked<ListSymptomRecordUseCase> =>
  ({ execute: jest.fn() } as unknown) as jest.Mocked<ListSymptomRecordUseCase>;

export const createUpdateSymptomRecordUseCaseMock = (): jest.Mocked<UpdateSymptomRecordUseCase> =>
  ({ execute: jest.fn() } as unknown) as jest.Mocked<UpdateSymptomRecordUseCase>;

export const createDeleteSymptomRecordUseCaseMock = (): jest.Mocked<DeleteSymptomRecordUseCase> =>
  ({ execute: jest.fn() } as unknown) as jest.Mocked<DeleteSymptomRecordUseCase>;
