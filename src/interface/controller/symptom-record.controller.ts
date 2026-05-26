import { Request, Response } from 'express';
import { RegisterSymptomRecordUseCase } from '../../application/use-case/symptom-record/register-symptom-record.usecase';
import { ListSymptomRecordUseCase } from '../../application/use-case/symptom-record/list-symptom-record.usecase';
import { GetByIdSymptomRecordUseCase } from '../../application/use-case/symptom-record/get-symptom-record.usecase';
import { UpdateSymptomRecordUseCase } from '../../application/use-case/symptom-record/update-symptom-record.usecase';
import { DeleteSymptomRecordUseCase } from '../../application/use-case/symptom-record/delete-symptom-record.usecase';

export class SymptomRecordController {

    constructor(
        private readonly registerUseCase: RegisterSymptomRecordUseCase,
        private readonly listUseCase: ListSymptomRecordUseCase,
        private readonly getByIdUseCase: GetByIdSymptomRecordUseCase,
        private readonly updateUseCase: UpdateSymptomRecordUseCase,
        private readonly deleteUseCase: DeleteSymptomRecordUseCase,
    ) {}

    async register(req: Request, res: Response) {
        const output = await this.registerUseCase.execute(req.body);
        return res.status(201).json(output);
    }

    async list(req: Request, res: Response) {
        const output = await this.listUseCase.execute(req.query as any);
        return res.status(200).json(output);
    }

    async getById(req: Request, res: Response) {
        const userId = Array.isArray(req.query.userId) ? req.query.userId[0] : req.query.userId;
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const output = await this.getByIdUseCase.execute({
            id: id!,
            userId: userId as string,
        });
        return res.status(200).json(output);
    }

    async update(req: Request, res: Response) {
        const output = await this.updateUseCase.execute({
            ...req.body,
            id: req.params.id!,
        });
        return res.status(200).json(output);
    }

    async delete(req: Request, res: Response) {
        const userId = Array.isArray(req.query.userId) ? req.query.userId[0] : req.query.userId;
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const output = await this.deleteUseCase.execute({
            userId: userId as string,
            id: id!,
        });
        return res.status(200).json(output);
    }
}