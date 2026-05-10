import { UpdateSymptomRecordUseCase } from "../../../../../src/application/use-case/symptom-record/update-symptom-record.usecase";
import { UpdateSymptomRecordInputDTO } from "../../../../../src/application/use-case/symptom-record/model/update-symptom-record-input.dto";
import { SymptomRecordRepository } from "../../../../../src/domain/repository/symptom-record.repository";
import { SymptomRecord } from "../../../../../src/domain/entity/symptom-record";
import { createSymptomRecordRepositoryMock } from "../../../../mocks/repositories/symptom-record-repository.mock";

describe('UpdateSymptomRecordUseCase', () => {
  let mockRepo: jest.Mocked<SymptomRecordRepository>;
  let useCase: UpdateSymptomRecordUseCase;

  beforeEach(() => {
    mockRepo = createSymptomRecordRepositoryMock();
    useCase = new UpdateSymptomRecordUseCase(mockRepo);
  });

  it('should update a SymptomRecord and return the record id', async () => {
    const existingRecord = SymptomRecord.rehydrate(
      'record-1',
      'user-1',
      new Date('2025-10-14T00:00:00Z'),
      [{ symptom: 'bloating', intensity: 3 }],
      'original notes',
    );
    mockRepo.findById.mockResolvedValue(existingRecord);

    let updatedRecord: SymptomRecord | undefined;
    mockRepo.update.mockImplementation(async (record: SymptomRecord) => {
      updatedRecord = record;
    });

    const input: UpdateSymptomRecordInputDTO = {
      id: 'record-1',
      userId: 'user-1',
      recordAt: '2025-10-15T00:00:00Z',
      symptoms: [{ symptom: 'Diarrhea', intensity: 5 }],
      notes: 'updated notes',
    };

    const result = await useCase.execute(input);

    expect(mockRepo.findById).toHaveBeenCalledWith('record-1');
    expect(updatedRecord).toBeInstanceOf(SymptomRecord);
    expect(updatedRecord?.getRecordAt().toISOString()).toBe(
      new Date(input.recordAt!).toISOString(),
    );
    expect(updatedRecord?.getSymptoms()).toEqual([
      { symptom: 'diarrhea', intensity: 5 },
    ]);
    expect(updatedRecord?.getNotes()).toBe('updated notes');
    expect(result).toEqual({ id: 'record-1' });
    expect(mockRepo.update).toHaveBeenCalledWith(updatedRecord);
  });

  it('should throw when record not found', async () => {
    mockRepo.findById.mockResolvedValue(null);
    const input: UpdateSymptomRecordInputDTO = {
      id: 'non-existent',
      userId: 'user-1',
      notes: 'updated notes',
    };
    await expect(useCase.execute(input)).rejects.toThrow('Symptom record not found');
    expect(mockRepo.update).not.toHaveBeenCalled();
  });

  it('should throw when user does not own the record', async () => {
    const existingRecord = SymptomRecord.rehydrate(
      'record-1',
      'user-1',
      new Date('2025-10-14T00:00:00Z'),
      [{ symptom: 'bloating', intensity: 3 }],
      'notes',
    );
    mockRepo.findById.mockResolvedValue(existingRecord);
    const input: UpdateSymptomRecordInputDTO = {
      id: 'record-1',
      userId: 'user-2',
      notes: 'updated notes',
    };
    await expect(useCase.execute(input)).rejects.toThrow(
      'Unauthorized: record does not belong to this user',
    );
    expect(mockRepo.update).not.toHaveBeenCalled();
  });

  it('should throw when id is not provided', async () => {
    const input = {
      id: '',
      userId: 'user-1',
      notes: 'updated notes',
    } as UpdateSymptomRecordInputDTO;
    await expect(useCase.execute(input)).rejects.toThrow('id is required');
    expect(mockRepo.findById).not.toHaveBeenCalled();
  });

  it('should throw when userId is not provided', async () => {
    const input = {
      id: 'record-1',
      userId: '',
      notes: 'updated notes',
    } as UpdateSymptomRecordInputDTO;
    await expect(useCase.execute(input)).rejects.toThrow('userId is required');
    expect(mockRepo.findById).not.toHaveBeenCalled();
  });

  it('should update only notes without updating other fields', async () => {
    const originalDate = new Date('2025-10-14T00:00:00Z');
    const originalSymptoms = [{ symptom: 'bloating', intensity: 3 }];
    const existingRecord = SymptomRecord.rehydrate(
      'record-1',
      'user-1',
      originalDate,
      originalSymptoms,
      'original notes',
    );
    mockRepo.findById.mockResolvedValue(existingRecord);

    let updatedRecord: SymptomRecord | undefined;
    mockRepo.update.mockImplementation(async (record: SymptomRecord) => {
      updatedRecord = record;
    });

    const input: UpdateSymptomRecordInputDTO = {
      id: 'record-1',
      userId: 'user-1',
      notes: 'new notes only',
    };
    const result = await useCase.execute(input);

    expect(updatedRecord?.getRecordAt().toISOString()).toBe(originalDate.toISOString());
    expect(updatedRecord?.getSymptoms()).toEqual(originalSymptoms);
    expect(updatedRecord?.getNotes()).toBe('new notes only');
    expect(result).toEqual({ id: 'record-1' });
    expect(mockRepo.update).toHaveBeenCalled();
  });
});
