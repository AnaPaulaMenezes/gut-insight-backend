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
   *                 description: The user ID who is creating this record
   *               recordAt:
   *                 type: string
   *                 format: date-time
   *                 description: The date and time of the symptom record
   *               symptoms:
   *                 type: array
   *                 minItems: 1
   *                 items:
   *                   type: object
   *                   required:
   *                     - symptom
   *                     - intensity
   *                   properties:
   *                     symptom:
   *                       type: string
   *                       description: Name of the symptom
   *                     intensity:
   *                       type: number
   *                       description: Intensity from 1 to 10
   *                     notes:
   *                       type: string
   *                       description: Notes about this specific symptom
   *               notes:
   *                 type: string
   *                 description: General notes about the record
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
   *                   description: The ID of the created record
   */
  router.post("/", (req, res) => symptomRecordController.register(req, res));
  /**
   * @openapi
   * /symptom-records:
   *   get:
   *     tags:
   *       - SymptomRecords
   *     summary: List symptom records by userId
   *     parameters:
   *       - in: query
   *         name: userId
   *         required: true
   *         schema:
   *           type: string
   *         description: The user ID to filter records
   *       - in: query
   *         name: fromDate
   *         schema:
   *           type: string
   *           format: date-time
   *         description: Filter from date
   *       - in: query
   *         name: toDate
   *         schema:
   *           type: string
   *           format: date-time
   *         description: Filter to date
   *       - in: query
   *         name: symptom
   *         schema:
   *           type: string
   *         description: Filter by symptom
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
   *       400:
   *         description: Validation error (missing userId)
   */
  router.get("/", (req, res) => symptomRecordController.list(req, res));
  /**
   * @openapi
   * /symptom-records/{id}:
   *   get:
   *     tags:
   *       - SymptomRecords
   *     summary: Get a symptom record by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the symptom record
   *       - in: query
   *         name: userId
   *         required: true
   *         schema:
   *           type: string
   *         description: The user ID (must match the record owner)
   *     responses:
   *       200:
   *         description: A symptom record
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                 userId:
   *                   type: string
   *                 recordAt:
   *                   type: string
   *                   format: date-time
   *                 symptoms:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       symptom:
   *                         type: string
   *                       intensity:
   *                         type: number
   *                       notes:
   *                         type: string
   *                 notes:
   *                   type: string
   *       400:
   *         description: Validation error (missing id or userId, or unauthorized access)
   *       404:
   *         description: Symptom record not found
   */
  router.get("/:id", (req, res) => symptomRecordController.getById(req, res));
  /**
   * @openapi
   * /symptom-records/{id}:
   *   put:
   *     tags:
   *       - SymptomRecords
   *     summary: Update a symptom record
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the symptom record to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - userId
   *             properties:
   *               userId:
   *                 type: string
   *                 description: The user ID (must match the record owner)
   *               recordAt:
   *                 type: string
   *                 format: date-time
   *                 description: The date and time of the record
   *               symptoms:
   *                 type: array
   *                 items:
   *                   type: object
   *                   properties:
   *                     symptom:
   *                       type: string
   *                       description: The symptom name
   *                     intensity:
   *                       type: number
   *                       description: Intensity from 1 to 10
   *                     notes:
   *                       type: string
   *                       description: Notes about this symptom
   *               notes:
   *                 type: string
   *                 description: General notes about the record
   *     responses:
   *       200:
   *         description: Updated symptom record
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                 userId:
   *                   type: string
   *       400:
   *         description: Validation error (missing userId or invalid data)
   *       404:
   *         description: Symptom record not found
   */
  router.put("/:id", (req, res) => symptomRecordController.update(req, res));
  /**
   * @openapi
   * /symptom-records/{id}:
   *   delete:
   *     tags:
   *       - SymptomRecords
   *     summary: Delete a symptom record
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the symptom record to delete
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - userId
   *             properties:
   *               userId:
   *                 type: string
   *                 description: The user ID (must match the record owner)
   *     responses:
   *       200:
   *         description: Deleted symptom record
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *       400:
   *         description: Validation error (missing userId)
   *       404:
   *         description: Symptom record not found
   */
  router.delete("/:id", (req, res) => symptomRecordController.delete(req, res));
  return router;
}