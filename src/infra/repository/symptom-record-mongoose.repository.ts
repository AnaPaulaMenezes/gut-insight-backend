import { ListSymptomRecordInputDTO } from "../../application/use-case/symptom-record/model/list-symptom-record-input.dto";
import { SymptomRecord } from "../../domain/entity/symptom-record";
import { SymptomRecordRepository } from "../../domain/repository/symptom-record.repository";
import { SymptomRecordDocument, SymptomRecordModel } from "../schema/symptom-record.schema";

export class MongooseSymptomRecordRepository implements SymptomRecordRepository {
  async save(record: SymptomRecord): Promise<void> {
    const symptomRecordDoc = new SymptomRecordModel({
      _id: record.getId(),
      userId: record.getUserId(),
      recordAt: record.getRecordAt(),
      symptoms: record.getSymptoms(),
      notes: record.getNotes(),
    });
    await symptomRecordDoc.save();
  }
  findById(id: string): Promise<SymptomRecord | null> {
    throw new Error("Method not implemented.");
  }
  findByFilter(filters: ListSymptomRecordInputDTO): Promise<SymptomRecord[]> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findAll() {
    return SymptomRecordModel.find();
  }
  private toDocument(record: SymptomRecord) {
    return {
      userId: record.getUserId(),
      recordAt: record.getRecordAt(),
      symptoms: record.getSymptoms(),
      notes: record.getNotes(),
    };
  }

  private toDomain(doc: SymptomRecordDocument): SymptomRecord {
    return SymptomRecord.rehydrate(
      doc._id.toString(),
      doc.userId,
      doc.recordAt,
      doc.symptoms,
      doc.notes ?? "",
    );
  }
}
