
export interface MovementCriteria {
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
