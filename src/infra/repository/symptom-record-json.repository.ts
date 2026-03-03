import { promises as fs } from "fs";
import path from "path";
import { SymptomRecord } from "../../domain/entity/symptom-record";
import {
  SymptomRecordRepository,
} from "../../domain/repository/symptom-record.repository";
import { ListSymptomRecordInputDTO } from "../../application/use-case/symptom-record/model/list-symptom-record-input.dto";

type PersistenceModel = {
  id: string;
  userId: string;
  recordAt: string;
  symptoms: any[];
  notes: string;
};

export class SymptomRecordRepositoryImpl implements SymptomRecordRepository {
  private filePath = path.resolve(__dirname, "../../../data/records.json");

  private async readFile(): Promise<PersistenceModel[]> {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  private async writeFile(data: PersistenceModel[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }

  async save(record: SymptomRecord): Promise<void> {
    const records = await this.readFile();

    records.push(this.mapToModel(record));

    await this.writeFile(records);
  }

  async findById(id: string): Promise<SymptomRecord | null> {
    const records = await this.readFile();

    const found = records.find((r) => r.id === id);
    if (!found) return null;

    return this.mapToEntity(found);
  }

  async findByFilter(filter: ListSymptomRecordInputDTO): Promise<SymptomRecord[]> {
    const records = await this.readFile();

    const filtered = records.filter((r) => {
      if (filter.userId && r.userId !== filter.userId) return false;

      if (filter.fromDate && new Date(r.recordAt) < new Date(filter.fromDate))
        return false;

      if (filter.toDate && new Date(r.recordAt) > new Date(filter.toDate)) return false;

      return true;
    });

    return filtered.map(this.mapToEntity);
  }

  async update(record: SymptomRecord): Promise<void> {
    const records = await this.readFile();

    const index = records.findIndex((r) => r.id === record.getId());
    if (index === -1) throw new Error("Record not found");

    records[index] = this.mapToModel(record);

    await this.writeFile(records);
  }

  async deleteById(id: string): Promise<void> {
    const records = await this.readFile();

    const filtered = records.filter((r) => r.id !== id);

    await this.writeFile(filtered);
  }

  // 🔄 Mapper: Domain → JSON
  private mapToModel(record: SymptomRecord): PersistenceModel {
    return {
      id: record.getId(),
      userId: record.getUserId(),
      recordAt: record.getRecordAt().toISOString(),
      symptoms: record.getSymptoms(),
      notes: record.getNotes() || "",
    };
  }

  // 🔄 Mapper: JSON → Domain
  private mapToEntity(data: PersistenceModel): SymptomRecord {
    return SymptomRecord.rehydrate(
      data.id,
      data.userId,
      new Date(data.recordAt),
      data.symptoms,
      data.notes,
    );
  }
}
