import { ListSymptomRecordInputDTO } from "./model/list-symptom-record-input.dto";
import { ListSymptomRecordOutput } from "./model/list-symptom-record-output.dto";
import { SymptomRecord } from "../../../domain/entity/symptom-record";
import { SymptomRecordRepository } from "../../../domain/repository/symptom-record.repository";

export class ListSymptomRecordUseCase {
  constructor(
    private readonly symptomRecordRepository: SymptomRecordRepository,
  ) {}

  public async execute(
    filter: ListSymptomRecordInputDTO,
  ): Promise<ListSymptomRecordOutput[]> {
    
    const records = await this.symptomRecordRepository.findByFilter({
      userId: filter.userId,
      fromDate: filter.fromDate ? new Date(filter.fromDate) : undefined,
      toDate: filter.toDate ? new Date(filter.toDate) : undefined,
      symptom: filter.symptom,
    });
    
    const output: ListSymptomRecordOutput[] = records.map((record) => ({
      id: record.getId(),
      recordAt: record.getRecordAt(),
      symptoms: record.getSymptoms().map((s) => ({
        symptom: s.symptom,
        intensity: s.intensity,
        notes: s.notes,
      })),
      notes: record.getNotes() || "",
    }));
    return output;
  }
}
