import { Criteria } from "../../shared/criteria.shared";

export interface MovementCriteria extends Criteria {
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
