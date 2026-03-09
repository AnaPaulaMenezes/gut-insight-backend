import { SymptomRecordInputDTO } from "../../../../../src/application/use-case/symptom-record/model/symptom-record-input.dto";
import { RegisterSymptomRecordUseCase } from "../../../../../src/application/use-case/symptom-record/register-symptom-record.usecase";
import { SymptomRecordRepository } from "../../../../../src/domain/repository/symptom-record.repository";

describe('RegisterSymptomRecordUseCase', () => {
  let mockRepo: jest.Mocked<SymptomRecordRepository>;
  let useCase: RegisterSymptomRecordUseCase;

  beforeEach(() => {
    mockRepo = {
      save: jest.fn(),
      findById: jest.fn(),
      findByFilter: jest.fn(),
      deleteById: jest.fn(),
    } as unknown as jest.Mocked<SymptomRecordRepository>;

    useCase = new RegisterSymptomRecordUseCase(mockRepo);
  });

  it('should create a SymptomRecord, save it, and return the record id', async () => {
    const input: SymptomRecordInputDTO = {
      userId: 'user-1',
      recordAt: '2025-10-14T00:00:00Z',
      symptoms: [{ symptom: 'Bloating', intensity: 3, notes: 'mild' }],
      notes: 'some notes',
    };

    let savedRecord: any;
    mockRepo.save.mockImplementation(async (record: any) => {
      savedRecord = record;
    });

    const result = await useCase.execute(input);

    expect(savedRecord).toBeDefined();
    expect(savedRecord.getUserId()).toBe(input.userId);
    expect(savedRecord.getRecordAt().toISOString()).toBe(
      new Date(input.recordAt).toISOString(),
    );
    expect(savedRecord.getSymptoms()).toEqual([
      { symptom: 'bloating', intensity: 3, notes: 'mild' },
    ]);
    expect(savedRecord.getNotes()).toBe(input.notes);

    expect(result).toEqual({ id: savedRecord.getId() });
    expect(mockRepo.save).toHaveBeenCalledWith(savedRecord);
  });
});
