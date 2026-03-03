import { Router } from "express";
import { SymptomRecordController } from "./controller/symptom-record.controller";

export function createRouter(symptomRecordController: SymptomRecordController): Router {
  const router = Router();
    router.post("/", (req, res) => symptomRecordController.register(req, res));
    router.get("/", (req, res) => symptomRecordController.list(req, res));
    // router.put("/symptom-records/:id", (req, res) => symptomRecordController.update(req, res));
    return router;
}