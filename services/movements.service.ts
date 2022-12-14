import Movement from "../models/mongoDB/movements/movement.model";
import { MovementCriteria } from "../models/movement/external/movementCriteia.model";
import MDBMovementModel from '../models/mongoDB/movements/movement.model';
import { MovementModel } from "../models/movement/mdb/movement.model";
import { AddMovementRequestModel } from "../models/movement/external/addMovementRequest.model";
import { GetAllMovementsResponseModel } from "../models/movement/external/getAllMovementsResponse.model";

async function GetMovementsByCriteria(criteria: MovementCriteria): Promise<GetAllMovementsResponseModel | undefined> {
    try {
        const date = new Date();
        const month = criteria.month || date.getMonth();
        const year = criteria.year || date.getFullYear();
        const movements = await Movement
            .aggregate([
                {
                    $match: {
                        userId: criteria.userId,
                        type: criteria.type,
                        month,
                        year
                    }
                }
            ]);
        const sumOfMovements = await Movement.aggregate([
            {
                $match: {
                    userId: criteria.userId,
                    type: criteria.type,
                    month,
                    year
                }
            }
            ,
            {
                $group: {
                    _id: 0,
                    totalAmount: { $sum: "$price" },
                    count: { $sum: 1 }
                }
            }
        ])
        const response = {
            year: year,
            month: month,
            movements,
            info: {
                sum: sumOfMovements[0].totalAmount,
                count: sumOfMovements[0].count
            }
        }
        return response;
    } catch (error: unknown) {
        if (error instanceof Error)
            throw new Error(error.message);
    }
}

async function AddMovement(currentUserId: string, movement: AddMovementRequestModel) {

    const model = GetModelWithSplitedDates(currentUserId, movement);

    const mdbMovementModel = new MDBMovementModel(model);

    return await mdbMovementModel.save();
}

async function UpdateMovement(id: string, movement: MovementModel) {

    const model = GetModelWithSplitedDates(movement.userId, movement);

    return await Movement.updateOne({ _id: id }, { ...model });
}

async function DeleteMovement(id: string) {
    return await Movement.findOneAndDelete({ _id: id });
}

function GetModelWithSplitedDates(currentUserId: string, movement: MovementModel | AddMovementRequestModel) {

    const date: string[] = movement.movementDate.split('-');

    const model: MovementModel = {
        ...movement,
        userId: currentUserId,
        year: parseInt(date[0]),
        month: parseInt(date[1]),
        day: parseInt(date[2])
    };

    return model;
}

export default {
    GetMovementsByCriteria,
    AddMovement,
    UpdateMovement,
    DeleteMovement,
}