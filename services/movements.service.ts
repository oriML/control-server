import Movement, { movementDA } from "../entities/movement.mdb";
import { IMovementCriteria } from "../models/movement/movement.criteia";
import categoriesService from "./categories.service";
import { IMovementModel } from "../models/movement/movementModel";
import { MovementController } from "../controllers/movements.controller";
import IBaseService from "./interface/base.interface.service";
import { MovementRepository } from "../repositories/movements.repository";
import { IPaginationResponse } from '../shared/paginationResponse.shared'
import { ErrorsModel } from "../models/errorsModel";
import { IMovementService } from "./interface/movements.interface.service";
export class MovementService implements IMovementService {

    private _repository: MovementRepository;

    constructor() {
        this._repository = new MovementRepository();
    }

    validateModel(item: IMovementModel, errors: ErrorsModel) {
        if (!item) {
            errors.add('item cannot be null');
            return false;
        } else {
            if (!item.movementDate) {
                errors.add('item must have valid date');
            }
            if (typeof item.price != 'number') {
                errors.add('item price must be a number');
            }
            if (!item.source) {
                errors.add('item must have a source');
            }
            if (!item.type) {
                errors.add('item must have a type');
            }
        }
        return errors.isEmpty();
    };

    async create(item: IMovementModel, errors: ErrorsModel) {
        if (this.validateModel(item, errors)) {

            const movement = new movementDA(item);

            await this._repository.create(movement);

        }
    };

    async getById(_id: string) {
        return await this._repository.getById(_id);
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

    async update(_id: string, item: IMovementModel, errors: ErrorsModel) {
        if (item && this.validateModel(item, errors)) {

            const movement = new movementDA(item);

            const _movement = await this._repository.update(_id, movement);

            return _movement;
        }
    };

    delete(_id: string) {
        return this._repository.delete(_id);
    };

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

    // set on category repo
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