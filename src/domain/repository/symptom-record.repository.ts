import { ListSymptomRecordInputDTO } from "../../use-case/symptom-record/model/list-symptom-record-input.dto";
import { SymptomRecord } from "../entity/symptom-record";

export interface SymptomRecordRepository {
  save(record: SymptomRecord): Promise<void>;
  findById(id: string): Promise<SymptomRecord | null>;
  findByFilter(filters: ListSymptomRecordInputDTO): Promise<SymptomRecord[]>;
  deleteById(id: string): Promise<void>;
}