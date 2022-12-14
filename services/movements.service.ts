import Movement from "../models/mongoDB/movements/movement.model";
import { MovementCriteria } from "../models/movement/external/movementCriteia.model";
import MDBMovementModel from '../models/mongoDB/movements/movement.model';
import { MovementModel } from "../models/movement/mdb/movement.model";
import { GetAllMovementsResponseModel } from "../models/movement/external/getAllMovementsResponse.model";
import categoriesService from "./categories.service";

async function GetMovementsByCriteria(criteria: MovementCriteria): Promise<GetAllMovementsResponseModel | undefined> {
    try {
        const date = new Date();
        const month = criteria.month || date.getMonth();
        const year = criteria.year || date.getFullYear();
        let movements = await Movement
            .aggregate([
                {
                    $match: {
                        userId: criteria.userId,
                        type: criteria.type,
                        month,
                        year
                    }
                },
                { $sort: { movementDate: -1 } },
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category"
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
        movements = movements.reduce((p, c) => ([
            ...p,
            {
                ...c,
                category: c.category[0]
            }
        ]), []);

        const response = {
            year: year,
            month: month,
            movements,
            info: {
                sum: sumOfMovements[0]?.totalAmount ?? 0,
                count: sumOfMovements[0]?.count ?? 0
            }
        }
        return response;
    } catch (error: unknown) {
        if (error instanceof Error)
            throw new Error(error.message);
    }
}

async function AddMovement(currentUserId: string, movement: MovementModel) {

    const model = GetModelWithSplitedDates(currentUserId, movement);

    await AddCategoryToModel(currentUserId, model);

    const mdbMovementModel = new MDBMovementModel(model);

    return await mdbMovementModel.save();
}

async function UpdateMovement(id: string, movement: MovementModel) {

    const model = GetModelWithSplitedDates(movement.userId, movement);

    await AddCategoryToModel(movement.userId, model);

    return await Movement.updateOne({ _id: id }, { ...model });
}

async function DeleteMovement(id: string) {
    return await Movement.findOneAndDelete({ _id: id });
}

function GetModelWithSplitedDates(currentUserId: string, movement: MovementModel) {

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

async function AddCategoryToModel(currentUserId: string, model: MovementModel) {
    const category = await categoriesService.FetchCategoryByTerm({ name: model.category.name });
    if (category != null) {
        model.category = category._id;
    } else {
        const _category = await categoriesService.CreateCategory(currentUserId, model.category.name, model.type);
        model.category = _category._id;
    }
}

export default {
    GetMovementsByCriteria,
    AddMovement,
    UpdateMovement,
    DeleteMovement,
}