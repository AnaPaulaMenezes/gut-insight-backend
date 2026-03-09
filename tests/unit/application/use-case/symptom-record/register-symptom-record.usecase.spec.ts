import { RegisterSymptomRecordUseCase } from "../../../../../src/application/use-case/symptom-record/register-symptom-record.usecase";
import { SymptomRecordRepository } from "../../../../../src/domain/repository/symptom-record.repository";
import { SymptomRecordInputDTO } from "../../../../../src/application/use-case/symptom-record/model/symptom-record-input.dto";
import { SymptomRecord } from "../../../../../src/domain/entity/symptom-record";
import { createSymptomRecordRepositoryMock } from "../../../../mocks/repositories/symptom-record-repository.mock";

describe('RegisterSymptomRecordUseCase', () => {
  let mockRepo: jest.Mocked<SymptomRecordRepository>;
  let useCase: RegisterSymptomRecordUseCase;

  beforeEach(() => {
    mockRepo = createSymptomRecordRepositoryMock();
    useCase = new RegisterSymptomRecordUseCase(mockRepo);
  });

  it('should create a SymptomRecord, save it, and return the record id', async () => {
    const input: SymptomRecordInputDTO = {
      userId: 'user-1',
      recordAt: '2025-10-14T00:00:00Z',
      symptoms: [{ symptom: 'Bloating', intensity: 3, notes: 'mild' }],
      notes: 'some notes',
    };

    let savedRecord: SymptomRecord | undefined;
    mockRepo.save.mockImplementation(async (record: SymptomRecord) => {
      savedRecord = record;
    });

    const result = await useCase.execute(input);

    expect(savedRecord).toBeInstanceOf(SymptomRecord);
    expect(savedRecord?.getUserId()).toBe(input.userId);
    expect(savedRecord?.getRecordAt().toISOString()).toBe(
      new Date(input.recordAt).toISOString(),
    );
    expect(savedRecord?.getSymptoms()).toEqual([
      { symptom: 'bloating', intensity: 3, notes: 'mild' },
    ]);
    expect(savedRecord?.getNotes()).toBe(input.notes);

    expect(result).toEqual({ id: savedRecord?.getId() });
    expect(mockRepo.save).toHaveBeenCalledWith(savedRecord!);
  });

  it('should throw when input fails domain validation', async () => {
    const input: SymptomRecordInputDTO = {
      userId: 'user-1',
      recordAt: '2025-10-14T00:00:00Z',
      symptoms: [],
    };

    await expect(useCase.execute(input)).rejects.toThrow(
      'At least one symptom observation is required',
    );
    expect(mockRepo.save).not.toHaveBeenCalled();
  });

  it('should propagate repository errors', async () => {
    const input: SymptomRecordInputDTO = {
      userId: 'user-1',
      recordAt: '2025-10-14T00:00:00Z',
      symptoms: [{ symptom: 'Bloating', intensity: 3 }],
    };

    const error = new Error('save failed');
    mockRepo.save.mockRejectedValue(error);

    await expect(useCase.execute(input)).rejects.toThrow(error);
    expect(mockRepo.save).toHaveBeenCalled();
  });
});
