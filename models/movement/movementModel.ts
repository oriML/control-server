import { IMovementCategoryModel } from "../category/categoryModel";

export interface IMovementModel {
    userId: string;
    movementDate: string;
    price: number;
    year: number;
    month: number;
    day: number;
    notes: string;
    source: string;
    type: number;
    category: IMovementCategoryModel;
}