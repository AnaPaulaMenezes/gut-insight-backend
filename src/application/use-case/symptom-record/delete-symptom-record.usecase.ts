import type { SymptomRecordOutputDTO } from "./model/symptom-record-output.dto";
import type { DeleteSymptomRecordInputDTO } from "./model/delete-symptom-record-input.dto";
import type { SymptomRecordRepository } from "../../../domain/repository/symptom-record.repository";
import { ValidationError } from "../../../domain/errors/validation-error";
import { NotFoundError } from "../../../domain/errors/not-found-error";

export class DeleteSymptomRecordUseCase {
  constructor(
    private readonly symptomRecordRepository: SymptomRecordRepository,
  ) {}

  public async execute(
    input: DeleteSymptomRecordInputDTO,
  ): Promise<SymptomRecordOutputDTO> {
    if (!input.id) {
      throw new ValidationError("id is required");
    }
    if (!input.userId) {
      throw new ValidationError("userId is required");
    }

    const existingRecord = await this.symptomRecordRepository.findById(input.id);
    if (!existingRecord) {
      throw new NotFoundError("Symptom record not found");
    }
    if (existingRecord.getUserId() !== input.userId) {
      throw new ValidationError("Unauthorized: record does not belong to this user");
    }

    await this.symptomRecordRepository.deleteById(input.id);

    return { id: input.id };
  }
}
