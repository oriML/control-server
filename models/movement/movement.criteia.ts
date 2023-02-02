import { ICriteria } from "../../shared/criteria.shared";

export interface IMovementCriteria extends ICriteria {
    userId?: string;
    type: number;
    createDate?: Date;
    movementDate?: Date;
    source?: number;
    year?: number;
    month?: number;
    pageNumber?: number;
    pageSize?: number;
}
