import { ListSymptomRecordInputDTO } from "./model/list-symptom-record-input.dto";
import { ListSymptomRecordOutput } from "./model/list-symptom-record-output.dto";
import { SymptomRecordRepository } from "../../../domain/repository/symptom-record.repository";
import { ValidationError } from "../../../domain/errors/validation-error";

export class ListSymptomRecordUseCase {
  constructor(
    private readonly symptomRecordRepository: SymptomRecordRepository,
  ) {}

  public async execute(
    filter: ListSymptomRecordInputDTO,
  ): Promise<ListSymptomRecordOutput[]> {
    if (!filter.userId) {
      throw new ValidationError("userId is required");
    }
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
