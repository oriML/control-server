import { MovementCategoryModel } from "../../category/mdb/category.model";

export interface MovementResponseModel {
    movementDate: Date;
    price: number;
    notes: string;
    source: string;
    type: string;
    category: MovementCategoryModel;
}