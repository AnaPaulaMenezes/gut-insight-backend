import { SymptomRecordInputDTO } from "./model/symptom-record-input.dto";
import { SymptomRecordOutputDTO } from "./model/symptom-record-output.dto";
import { SymptomRecord } from "../../../domain/entity/symptom-record";
import { SymptomRecordRepository } from "../../../domain/repository/symptom-record.repository";

export class RegisterSymptomRecordUseCase {
  constructor(
    private readonly symptomRecordRepository: SymptomRecordRepository,
  ) {}

  public async execute(
    record: SymptomRecordInputDTO,
  ): Promise<SymptomRecordOutputDTO> {
    const symptomRecord =  SymptomRecord.create(
      record.userId,
      new Date(record.recordAt),
      record.symptoms,
      record.notes,
    );

    await this.symptomRecordRepository.save(symptomRecord);

    return { 
      id: symptomRecord.getId() 
    };
  }
}
