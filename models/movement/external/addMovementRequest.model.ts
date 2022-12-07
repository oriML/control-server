import { MovementCategoryModel } from "../../category/mdb/category.model";
export interface AddMovementRequestModel {
    movementDate: string;
    price: number;
    notes: string;
    source: string;
    type: string;
    category: MovementCategoryModel;
}
