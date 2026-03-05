import { Router } from "express";
import {createRouter} from "./interface/symptom-record.route";
import { AppModule } from "./app.module";

export function buildRoutes(): Router {
    const router = Router();
    const symptomRecordController = AppModule.createSymptomRecord();
    router.use("/symptom-records", createRouter(symptomRecordController));

    return router;
}