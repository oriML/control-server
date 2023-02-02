import Movement from "../entities/movement.mdb";
import { IMovementCriteria } from "../models/movement/movement.criteia";
import MDBMovementModel from '../entities/movement.mdb';
import categoriesService from "./categories.service";
import { IMovementModel } from "../models/movement/movementModel";
import { MovementController } from "../controllers/movements.controller";
import IBaseService from "./interface/base.interface.service";
import { MovementRepository } from "../repositories/movements.repository";
import { IPaginationResponse } from '../shared/paginationResponse.shared'
export class MovementService implements IBaseService<IMovementModel, IMovementCriteria>{

    private _movementRepository: MovementRepository;

    constructor() {
        this._movementRepository = new MovementRepository();
    }
    create(item: IMovementModel) {

    };
    getById(_id: string) {

    };
    update(_id: string, item: IMovementModel) {

    };
    delete(_id: string) {

    };
    // implement interface to accept only extends ICriteria params
    async getByCriteria(criteria: IMovementCriteria): Promise<IPaginationResponse<IMovementModel> | null> {
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
                        //     $sum: [
                        //         "$price",
                        //         {
                        //             $filter: {
                        //                 input: "$totalAmount",
                        //                 as: "t",
                        //                 cond: {
                        //                     $not: {
                        //                         $eq: ["$$t.categoty", "63b5bb752ff59db55e4352b7"]
                        //                     }
                        //                 }
                        //             }
                        //         }]
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
            const _response = {
                data: movements,
                amount: sumOfMovements[0]?.totalAmount ?? 0,
                totalCount: sumOfMovements[0]?.count ?? 0,
            } as IPaginationResponse<IMovementModel>;

            return _response;
        } catch (error: unknown) {
            if (error instanceof Error)
                throw new Error(error.message);
        }
        return null;
    }

    async addMovement(currentUserId: string, movement: IMovementModel) {

        const model = this.getModelWithSplitedDates(currentUserId, movement);

        await this.addCategoryToModel(currentUserId, model);

        const mdbMovementModel = new MDBMovementModel(model);

        return await mdbMovementModel.save();
    }

    async updateMovement(id: string, movement: IMovementModel) {

        const model = this.getModelWithSplitedDates(movement.userId, movement);

        await this.addCategoryToModel(movement.userId, model);

        return await Movement.updateOne({ _id: id }, { ...model });
    }

    async feleteMovement(id: string) {
        return await Movement.findOneAndDelete({ _id: id });
    }

    getModelWithSplitedDates(currentUserId: string, movement: IMovementModel) {

        const date: string[] = movement.movementDate.split('-');

        const model = {
            ...movement,
            userId: currentUserId,
            year: parseInt(date[0]),
            month: parseInt(date[1]),
            day: parseInt(date[2])
        } as IMovementModel;

        return model;
    }

    async addCategoryToModel(currentUserId: string, model: IMovementModel) {
        const category = await categoriesService.FetchCategoryByTerm({ name: model.category.name });
        if (category != null) {
            model.category = category._id;
        } else {
            const _category = await categoriesService.CreateCategory(currentUserId, model.category.name, model.type);
            model.category = _category._id;
        }
    }
}

export default MovementController;