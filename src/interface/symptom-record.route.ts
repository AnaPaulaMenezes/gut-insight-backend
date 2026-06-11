import { Router } from "express";
import { SymptomRecordController } from "./controller/symptom-record.controller";

export function createRouter(symptomRecordController: SymptomRecordController): Router {
  const router = Router();
  router.post("/", (req, res) => symptomRecordController.register(req, res));
  router.get("/", (req, res) => symptomRecordController.list(req, res));
  router.get("/:id", (req, res) => symptomRecordController.getById(req, res));
  router.put("/:id", (req, res) => symptomRecordController.update(req, res));
  router.delete("/:id", (req, res) => symptomRecordController.delete(req, res));
  return router;
}