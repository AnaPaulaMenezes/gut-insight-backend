import { SymptomRecord } from "../../src/domain/entity/symptom-record";
import { MongooseSymptomRecordRepository } from "../../src/infra/repository/symptom-record-mongoose.repository";
import { SymptomRecordModel } from "../../src/infra/schema/symptom-record.schema";
jest.mock("../../src/infra/schema/symptom-record.schema", () => ({
  SymptomRecordModel: {
    create: jest.fn(),
    findById: jest.fn(),
    find: jest.fn(),
    findByIdAndUpdate: jest.fn().mockReturnValue({
      exec: jest.fn(),
    }),
    findByIdAndDelete: jest.fn().mockReturnValue({
      exec: jest.fn(),
    }),
  },
}));

describe(MongooseSymptomRecordRepository.name, () => {
  let repository: MongooseSymptomRecordRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new MongooseSymptomRecordRepository();
  });

  describe("save", () => {
    it("should call SymptomRecordModel.create with correct document", async () => {
      const record = SymptomRecord.create(
        "user-1",
        new Date("2024-01-01T00:00:00Z"),
        [{ symptom: "bloating", intensity: 3 }],
        "notes",
      );

      await repository.save(record);

      expect(SymptomRecordModel.create).toHaveBeenCalledWith({
        _id: record.getId(),
        userId: "user-1",
        recordAt: new Date("2024-01-01T00:00:00Z"),
        symptoms: [{ symptom: "bloating", intensity: 3 }],
        notes: "notes",
      });
    });
  });

  describe("update", () => {
    it("should call SymptomRecordModel.findByIdAndUpdate with correct params", async () => {
      const record = SymptomRecord.create(
        "user-1",
        new Date("2024-01-01T00:00:00Z"),
        [{ symptom: "bloating", intensity: 3 }],
        "notes",
      );
      const expectedDoc = {
        _id: record.getId(),
        userId: "user-1",
        recordAt: new Date("2024-01-01T00:00:00Z"),
        symptoms: [{ symptom: "bloating", intensity: 3 }],
        notes: "notes",
      };

      await repository.update(record);

      expect(SymptomRecordModel.findByIdAndUpdate).toHaveBeenCalledWith(
        expectedDoc._id,
        expectedDoc,
        { new: true },
      );
    });
  });

  describe("findById", () => {
    it("should return a symptom record by its ID", async () => {
      const id = "record-1";
      const mockReturn = {
        _id: id,
        userId: "user-1",
        recordAt: new Date("2024-01-01T00:00:00Z"),
        symptoms: [{ symptom: "bloating", intensity: 3 }],
        notes: "notes",
      };

      const expectedDomain = SymptomRecord.rehydrate(mockReturn._id, mockReturn.userId, mockReturn.recordAt, mockReturn.symptoms, mockReturn.notes);
      
      (SymptomRecordModel.findById as jest.Mock).mockResolvedValue(mockReturn);
      
      const actual = await repository.findById(id);
      
      expect(SymptomRecordModel.findById).toHaveBeenCalledWith(id);
      expect(actual).toEqual(expectedDomain);
    });

    it("should return null if no record is found with the given ID", async () => {
        const id = "non-existent-id";
        (SymptomRecordModel.findById as jest.Mock).mockResolvedValue(null);
        
        const actual = await repository.findById(id);
        
        expect(SymptomRecordModel.findById).toHaveBeenCalledWith(id);
        expect(actual).toBeNull();
    });
  });

  describe("findByFilter", () => {
    it("should return symptom records matching the provided filters", async () => {
        const filters = { userId: "user-1", fromDate: new Date("2024-01-01T00:00:00Z"), toDate: new Date("2024-01-31T23:59:59Z"), symptom: "bloating" };
        const mockReturn = [
          {
            _id: "record-1",
            userId: "user-1",
            recordAt: new Date("2024-01-15T12:00:00Z"),
            symptoms: [{ symptom: "bloating", intensity: 3 }],
            notes: "notes",
          },
        ];

        const expectedDomain = mockReturn.map(doc => SymptomRecord.rehydrate(doc._id, doc.userId, doc.recordAt, doc.symptoms, doc.notes));
        
        (SymptomRecordModel.find as jest.Mock).mockResolvedValue(mockReturn);
        
        const actual = await repository.findByFilter(filters);
        
        expect(SymptomRecordModel.find).toHaveBeenCalledWith({
          userId: filters.userId,
          recordAt: { $gte: filters.fromDate, $lte: filters.toDate },
          symptoms: { $elemMatch: { symptom: filters.symptom } },
        });
        expect(actual).toEqual(expectedDomain);
    });

    it("should return an empty array if no records match the filters", async () => {
        const filters = { userId: "user-1", fromDate: new Date("2024-01-01T00:00:00Z"), toDate: new Date("2024-01-31T23:59:59Z"), symptom: "non-existent-symptom" };
        (SymptomRecordModel.find as jest.Mock).mockResolvedValue([]);

        const actual = await repository.findByFilter(filters);

        expect(SymptomRecordModel.find).toHaveBeenCalledWith({
          userId: filters.userId,
          recordAt: { $gte: filters.fromDate, $lte: filters.toDate },
          symptoms: { $elemMatch: { symptom: filters.symptom } },
        });
        expect(actual).toEqual([]);
    });
  });

  describe("deleteById", () => {
    it("should delete a symptom record by its ID", async () => {
        const id = "record-1";
        await repository.deleteById(id);
        
        expect(SymptomRecordModel.findByIdAndDelete).toHaveBeenCalledWith(id);
    });
  });
});
