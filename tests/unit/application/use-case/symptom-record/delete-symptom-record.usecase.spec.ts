import { DeleteSymptomRecordUseCase } from "../../../../../src/application/use-case/symptom-record/delete-symptom-record.usecase";
import { DeleteSymptomRecordInputDTO } from "../../../../../src/application/use-case/symptom-record/model/delete-symptom-record-input.dto";
import { SymptomRecordRepository } from "../../../../../src/domain/repository/symptom-record.repository";
import { SymptomRecord } from "../../../../../src/domain/entity/symptom-record";
import { createSymptomRecordRepositoryMock } from "../../../../mocks/repositories/symptom-record-repository.mock";

describe('DeleteSymptomRecordUseCase', () => {
  let mockRepo: jest.Mocked<SymptomRecordRepository>;
  let useCase: DeleteSymptomRecordUseCase;

  beforeEach(() => {
    mockRepo = createSymptomRecordRepositoryMock();
    useCase = new DeleteSymptomRecordUseCase(mockRepo);
  });

  it('should delete a SymptomRecord and return the record id', async () => {
    const existingRecord = SymptomRecord.rehydrate(
      'record-1',
      'user-1',
      new Date('2025-10-14T00:00:00Z'),
      [{ symptom: 'bloating', intensity: 3 }],
      'notes',
    );
    mockRepo.findById.mockResolvedValue(existingRecord);

    const input: DeleteSymptomRecordInputDTO = {
      id: 'record-1',
      userId: 'user-1',
    };

    const result = await useCase.execute(input);

    expect(mockRepo.findById).toHaveBeenCalledWith('record-1');
    expect(mockRepo.deleteById).toHaveBeenCalledWith('record-1');
    expect(result).toEqual({ id: 'record-1' });
  });

  it('should throw when record not found', async () => {
    mockRepo.findById.mockResolvedValue(null);
    const input: DeleteSymptomRecordInputDTO = {
      id: 'non-existent',
      userId: 'user-1',
    };
    await expect(useCase.execute(input)).rejects.toThrow('Symptom record not found');
    expect(mockRepo.deleteById).not.toHaveBeenCalled();
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
    const input: DeleteSymptomRecordInputDTO = {
      id: 'record-1',
      userId: 'user-2',
    };
    await expect(useCase.execute(input)).rejects.toThrow(
      'Unauthorized: record does not belong to this user',
    );
    expect(mockRepo.deleteById).not.toHaveBeenCalled();
  });

  it('should throw when id is not provided', async () => {
    const input = {
      id: '',
      userId: 'user-1',
    } as DeleteSymptomRecordInputDTO;
    await expect(useCase.execute(input)).rejects.toThrow('id is required');
    expect(mockRepo.findById).not.toHaveBeenCalled();
  });

  it('should throw when userId is not provided', async () => {
    const input = {
      id: 'record-1',
      userId: '',
    } as DeleteSymptomRecordInputDTO;
    await expect(useCase.execute(input)).rejects.toThrow('userId is required');
    expect(mockRepo.findById).not.toHaveBeenCalled();
  });
});
