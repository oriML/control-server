import { MovementCategoryModel } from "../../category/category.model";

export interface MovementModel {
    userId: string;
    movementDate: string;
    price: number;
    year: number;
    month: number;
    day: number;
    notes: string;
    source: string;
    type: number;
    category: MovementCategoryModel;
}
