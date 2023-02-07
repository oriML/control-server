import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ErrorsModel } from '../models/errorsModel';
import { IMovementCriteria } from '../models/movement/movement.criteia';
import { IMovementModel } from '../models/movement/movementModel';
import { MovementService } from '../services/movements.service';
import BaseController from './base/base.controller';


export class MovementController implements BaseController<MovementService>{

    private readonly _service: MovementService;

    constructor(
    ) {
        this._service = new MovementService();
    }

    getById(req: Request, res: Response, next: NextFunction) {
        try {

            const { id } = req.body;

            return this._service.getById(id);

        } catch (error) {
            if (error instanceof Error)
                throw new Error(error.message);

            return res.send(500).json({ message: error });

        }
    }

    async getByCriteria(req: Request, res: Response, next: NextFunction) {
        try {

            const criteria: IMovementCriteria = req.body;

            criteria.userId = res.locals.currentUserId;

            const results = await this._service.getByCriteria(criteria);

            return res.send(results);

        } catch (error) {
            if (error instanceof Error)
                throw new Error(error.message);

            return res.send(500).json({ message: error });
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {

            const currentUserId = res.locals.currentUserId;

            if (currentUserId != null) {

                const movement = req.body as IMovementModel;

                const errors = new ErrorsModel();

                const movementResponeModel = await this._service.create(movement, errors);

                if (errors.isEmpty()) {

                    return res.status(200).json(movementResponeModel);

                } else {

                    return res.status(500).json({ message: errors.errors });

                }
            }
        } catch (error) {

            if (error instanceof Error)
                throw new Error(error.message);

            return res.send(500).json({ message: error });
        }

    };

    async update(req: Request, res: Response, next: NextFunction) {
        try {

            const movement = req.body as IMovementModel;

            const errors = new ErrorsModel();

            const { id } = req.params;

            const updatedMovement = this._service.update(id, movement, errors);

            return res.send(updatedMovement);

        } catch (error) {
            if (error instanceof Error)
                throw new Error(error.message);

            return res.send(500).json({ message: error });
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {

            const { id } = req.params;

            this._service.delete(id);

            return res.sendStatus(200);

        } catch (error) {
            if (error instanceof Error)
                throw new Error(error.message);

            return res.send(500).json({ message: error });
        }
    }

}