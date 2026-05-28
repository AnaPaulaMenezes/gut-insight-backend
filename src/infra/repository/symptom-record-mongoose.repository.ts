import { SymptomRecord } from "../../domain/entity/symptom-record";
import {
  SymptomRecordFilters,
  SymptomRecordRepository,
} from "../../domain/repository/symptom-record.repository";
import {
  SymptomRecordDocument,
  SymptomRecordModel,
} from "../schema/symptom-record.schema";

export class MongooseSymptomRecordRepository implements SymptomRecordRepository {
  async save(record: SymptomRecord): Promise<void> {
    await SymptomRecordModel.create({
      ...this.toDocument(record),
    });
  }

  async update(record: SymptomRecord): Promise<void> {
    await SymptomRecordModel.findByIdAndUpdate(
      record.getId(),
      this.toDocument(record),
      {
        new: true,
      },
    ).exec();
  }

  async findById(id: string): Promise<SymptomRecord | null> {
    const doc = await SymptomRecordModel.findById(id);
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async findByFilter(filters: SymptomRecordFilters): Promise<SymptomRecord[]> {
    const query: Record<string, any> = { userId: filters.userId };

    if (filters.fromDate && filters.toDate) {
      query.recordAt = {
        $gte: filters.fromDate,
        $lte: filters.toDate,
      };
    }

    if (filters.symptom) {
      query.symptoms = {
        $elemMatch: {
          symptom: filters.symptom,
        },
      };
    }

    const docs = await SymptomRecordModel.find(query);
    return docs.map((doc) => this.toDomain(doc));
  }

  async deleteById(id: string): Promise<void> {
    await SymptomRecordModel.findByIdAndDelete(id).exec();
  }

  private toDocument(record: SymptomRecord) {
    return {
      _id: record.getId(),
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
      doc.symptoms.map((s) => ({
        symptom: s.symptom,
        intensity: s.intensity,
        notes: s.notes,
      })),
      doc.notes ?? "",
    );
  }
}
