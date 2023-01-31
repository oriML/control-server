import { NextFunction, Request, Response } from 'express';
import { MovementCriteria } from '../models/movement/movement.criteia';
import { IMovementModel } from '../models/movement/movementModel';
import MovementsService from '../services/movements.service';
import movementsService from '../services/movements.service';

async function AddMovementAction(req: Request, res: Response, next: NextFunction) {
    try {

        const currentUserId = res.locals.currentUserId;

        if (currentUserId != null) {

            const movement = req.body as IMovementModel;

            if (
                movement?.price &&
                movement?.source &&
                movement?.type &&
                movement?.movementDate
            ) {

                const movementResponeModel = await MovementsService.AddMovement(currentUserId, movement);

                return res.status(200).json(movementResponeModel);
            }

            return res.status(500).json({ message: "not valid record!" });
        }
    } catch (error) {

        if (error instanceof Error)
            throw new Error(error.message);

        return res.send(500).json({ message: error });
    }

};

async function GetMovementsByCriteria(req: Request, res: Response, next: NextFunction) {

    const criteria: MovementCriteria = req.body;

    criteria.userId = res.locals.currentUserId;

    const results = await MovementsService.GetMovementsByCriteria(criteria);

    return res.send(results);
}

async function UpdateMovement(req: Request, res: Response, next: NextFunction) {
    try {

        const movement = req.body as IMovementModel;
        // const movement: 
        const { id } = req.params;

        const updatedMovement = movementsService.UpdateMovement(id, movement);

        return res.send(updatedMovement);

    } catch (error) {
        if (error instanceof Error)
            throw new Error(error.message);

        return res.send(500).json({ message: error });
    }
}

async function DeleteMovement(req: Request, res: Response, next: NextFunction) {
    try {

        // const movement: 
        const { id } = req.params;

        movementsService.DeleteMovement(id);

        return res.sendStatus(200);

    } catch (error) {
        if (error instanceof Error)
            throw new Error(error.message);

        return res.send(500).json({ message: error });
    }
}

export default {
    AddMovementAction,
    GetMovementsByCriteria,
    UpdateMovement,
    DeleteMovement,
}