import { IMovementCategoryModel } from "../../category/categoryModel";

export interface IMovement {
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