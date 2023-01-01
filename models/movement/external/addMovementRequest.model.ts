import { MovementCategoryModel } from "../../category/category.model";
export interface AddMovementRequestModel {
    movementDate: string;
    price: number;
    notes: string;
    source: string;
    type: number;
    category: MovementCategoryModel;
}
