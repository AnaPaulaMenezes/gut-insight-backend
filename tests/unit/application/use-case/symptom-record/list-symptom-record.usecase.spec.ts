import { ListSymptomRecordUseCase } from "../../../../../src/application/use-case/symptom-record/list-symptom-record.usecase";
import { ListSymptomRecordInputDTO } from "../../../../../src/application/use-case/symptom-record/model/list-symptom-record-input.dto";
import { ListSymptomRecordOutput } from "../../../../../src/application/use-case/symptom-record/model/list-symptom-record-output.dto";
import { SymptomRecordRepository } from "../../../../../src/domain/repository/symptom-record.repository";

describe('ListSymptomRecordUseCase', () => {
  let mockRepo: jest.Mocked<SymptomRecordRepository>;
  let useCase: ListSymptomRecordUseCase;

  beforeEach(() => {
    mockRepo = {
      findByFilter: jest.fn(),
    } as unknown as jest.Mocked<SymptomRecordRepository>;

    useCase = new ListSymptomRecordUseCase(mockRepo);
  });

  it('should call repository.findByFilter with the provided filter and map results', async () => {
    const filter: ListSymptomRecordInputDTO = { userId: 'user-1', fromDate: '2025-10-01', toDate: '2025-10-31' };

    const record = {
      getId: () => 'record-1',
      getRecordAt: () => new Date('2025-10-14T00:00:00Z'),
      getSymptoms: () => [
        { symptom: 'bloating', intensity: 3, notes: 'mild' },
      ],
      getNotes: () => 'some notes',
    } as unknown as any;

    mockRepo.findByFilter.mockResolvedValue([record]);

    const result = await useCase.execute(filter);

    expect(mockRepo.findByFilter).toHaveBeenCalledWith(filter);
    const expected: ListSymptomRecordOutput[] = [
      {
        id: 'record-1',
        recordAt: new Date('2025-10-14T00:00:00Z'),
        symptoms: [{ symptom: 'bloating', intensity: 3, notes: 'mild' }],
        notes: 'some notes',
      },
    ];
    expect(result).toEqual(expected);
  });

  it('should return an empty array when repository returns no records', async () => {
    const filter: ListSymptomRecordInputDTO = { userId: 'user-1', fromDate: '2025-10-01', toDate: '2025-10-31' };
    mockRepo.findByFilter.mockResolvedValue([]);

    const result = await useCase.execute(filter);

    expect(mockRepo.findByFilter).toHaveBeenCalledWith(filter);
    expect(result).toEqual([]);
  });
});
