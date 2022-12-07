import { MovementCategoryModel } from "../../category/mdb/category.model";

export interface MovementModel {
    userId: string;
    movementDate: string;
    price: number;
    year: number;
    month: number;
    day: number;
    notes: string;
    source: string;
    type: string;
    category: MovementCategoryModel;
}
