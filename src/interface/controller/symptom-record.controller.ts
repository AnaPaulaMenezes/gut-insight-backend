import { Request, Response } from 'express';
import { RegisterSymptomRecordUseCase } from '../../application/use-case/symptom-record/register-symptom-record.usecase';
import { ListSymptomRecordUseCase } from '../../application/use-case/symptom-record/list-symptom-record.usecase';

export class SymptomRecordController {

    constructor(
        private readonly registerUseCase: RegisterSymptomRecordUseCase,
        private readonly listUseCase: ListSymptomRecordUseCase
    ) {}

    async register(req: Request, res: Response) {
        const output = await this.registerUseCase.execute(req.body);
        return res.status(201).json(output);
    }

    async list(req: Request, res: Response) {
        const output = await this.listUseCase.execute(req.query as any);
        return res.status(200).json(output);
    }

    // async update(req: Request, res: Response) {
    //     const output = await this.updateUseCase.execute({
    //         id: req.params.id,
    //         ...req.body
    //     });
    //     return res.status(200).json(output);
    // }
}