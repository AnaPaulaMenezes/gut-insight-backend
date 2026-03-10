import { Router } from "express";
import { SymptomRecordController } from "./controller/symptom-record.controller";

/**
 * @openapi
 * tags:
 *   - name: SymptomRecords
 *     description: Operations for symptom records
 */

export function createRouter(symptomRecordController: SymptomRecordController): Router {
  const router = Router();
  /**
   * @openapi
   * /symptom-records:
   *   post:
   *     tags:
   *       - SymptomRecords
   *     summary: Create a new symptom record
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - userId
   *               - recordAt
   *               - symptoms
   *             properties:
   *               userId:
   *                 type: string
   *               recordAt:
   *                 type: string
   *                 format: date-time
   *               symptoms:
   *                 type: array
   *                 items:
   *                   type: object
   *                   required:
   *                     - symptom
   *                     - intensity
   *                   properties:
   *                     symptom:
   *                       type: string
   *                     intensity:
   *                       type: number
   *                     notes:
   *                       type: string
   *               notes:
   *                 type: string
   *     responses:
   *       201:
   *         description: Created symptom record
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   */
  router.post("/", (req, res) => symptomRecordController.register(req, res));
  /**
   * @openapi
   * /symptom-records:
   *   get:
   *     tags:
   *       - SymptomRecords
   *     summary: List symptom records
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: A list of symptom records
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                   recordAt:
   *                     type: string
   *                     format: date-time
   *                   symptoms:
   *                     type: array
   *                     items:
   *                       type: object
   *                       properties:
   *                         symptom:
   *                           type: string
   *                         intensity:
   *                           type: number
   *                         notes:
   *                           type: string
   *                   notes:
   *                     type: string
   */
  router.get("/", (req, res) => symptomRecordController.list(req, res));
    // router.put("/symptom-records/:id", (req, res) => symptomRecordController.update(req, res));
    return router;
}