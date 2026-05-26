import { GetSymptomRecordInputDTO } from "./model/get-symptom-record-input.dto";
import { GetSymptomRecordOutputDTO } from "./model/get-symptom-record-output.dto";
import { SymptomRecordRepository } from "../../../domain/repository/symptom-record.repository";
import { ValidationError } from "../../../domain/errors/validation-error";
import { NotFoundError } from "../../../domain/errors/not-found-error";

export class GetByIdSymptomRecordUseCase {
  constructor(
    private readonly symptomRecordRepository: SymptomRecordRepository,
  ) {}

  public async execute(
    input: GetSymptomRecordInputDTO,
  ): Promise<GetSymptomRecordOutputDTO> {
    if (!input.id) {
      throw new ValidationError("id is required");
    }

    if (!input.userId) {
      throw new ValidationError("userId is required");
    }

    const record = await this.symptomRecordRepository.findById(input.id);

    if (!record) {
      throw new NotFoundError("Symptom record not found");
    }

    if (record.getUserId() !== input.userId) {
      throw new ValidationError("You are not authorized to access this record");
    }

    const output: GetSymptomRecordOutputDTO = {
      id: record.getId(),
      recordAt: record.getRecordAt(),
      symptoms: record.getSymptoms().map((s) => ({
        symptom: s.symptom,
        intensity: s.intensity,
        notes: s.notes,
      })),
      notes: record.getNotes() || "",
    };

    return output;
  }
}
