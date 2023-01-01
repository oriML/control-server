import { MovementCategoryModel } from "../../category/category.model";

export interface MovementResponseModel {
    movementDate: Date;
    price: number;
    notes: string;
    source: string;
    type: string;
    category: MovementCategoryModel;
}