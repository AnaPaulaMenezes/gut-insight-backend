import type { SymptomRecordOutputDTO } from "./model/symptom-record-output.dto";
import type { UpdateSymptomRecordInputDTO } from "./model/update-symptom-record-input.dto";
import type { SymptomRecordRepository } from "../../../domain/repository/symptom-record.repository";

export class UpdateSymptomRecordUseCase {
  constructor(
    private readonly symptomRecordRepository: SymptomRecordRepository,
  ) {}

  public async execute(
    input: UpdateSymptomRecordInputDTO,
  ): Promise<SymptomRecordOutputDTO> {
    if (!input.id) {
      throw new Error("id is required");
    }
    if (!input.userId) {
      throw new Error("userId is required");
    }

    const existingRecord = await this.symptomRecordRepository.findById(input.id);
    if (!existingRecord) {
      throw new Error("Symptom record not found");
    }
    if (existingRecord.getUserId() !== input.userId) {
      throw new Error("Unauthorized: record does not belong to this user");
    }

    if (input.recordAt) {
      existingRecord.updateRecordAt(new Date(input.recordAt));
    }
    if (input.symptoms) {
      existingRecord.updateSymptoms(input.symptoms);
    }
    if (input.notes !== undefined) {
      existingRecord.updateNotes(input.notes);
    }

    await this.symptomRecordRepository.update(existingRecord);

    return { id: existingRecord.getId() };
  }
}
