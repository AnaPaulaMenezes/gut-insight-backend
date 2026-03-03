import { SymptomRecordController } from "./interface/controller/symptom-record.controller";
import { RegisterSymptomRecordUseCase } from "./application/use-case/symptom-record/register-symptom-record.usecase";
import { ListSymptomRecordUseCase } from "./application/use-case/symptom-record/list-symptom-record.usecase";
import { SymptomRecordRepository } from "./domain/repository/symptom-record.repository";

export class AppModule {
    public static createSymptomRecord(): SymptomRecordController {
        const repository = {} as any; //Fix it
        const registerUseCase = new RegisterSymptomRecordUseCase(repository);
        const listUseCase = new ListSymptomRecordUseCase(repository);
        return new SymptomRecordController(registerUseCase, listUseCase);
    }
}