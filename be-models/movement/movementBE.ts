import { IMovementCategoryBE } from "../category/categoryBE";

export interface IMovementBE {
    userId: string;
    movementDate: string;
    price: number;
    year: number;
    month: number;
    day: number;
    notes: string;
    source: string;
    type: number;
    category: IMovementCategoryBE;
}