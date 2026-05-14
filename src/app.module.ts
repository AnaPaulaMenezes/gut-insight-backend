import { SymptomRecordController } from "./interface/controller/symptom-record.controller";
import { RegisterSymptomRecordUseCase } from "./application/use-case/symptom-record/register-symptom-record.usecase";
import { ListSymptomRecordUseCase } from "./application/use-case/symptom-record/list-symptom-record.usecase";
import { UpdateSymptomRecordUseCase } from "./application/use-case/symptom-record/update-symptom-record.usecase";
import { DeleteSymptomRecordUseCase } from "./application/use-case/symptom-record/delete-symptom-record.usecase";
import { MongooseSymptomRecordRepository } from "./infra/repository/symptom-record-mongoose.repository";

export class AppModule {
    public static createSymptomRecord(): SymptomRecordController {
        const repository = new MongooseSymptomRecordRepository();
        const registerUseCase = new RegisterSymptomRecordUseCase(repository);
        const listUseCase = new ListSymptomRecordUseCase(repository);
        const updateUseCase = new UpdateSymptomRecordUseCase(repository);
        const deleteUseCase = new DeleteSymptomRecordUseCase(repository);
        return new SymptomRecordController(
            registerUseCase,
            listUseCase,
            updateUseCase,
            deleteUseCase,
        );
    }
}