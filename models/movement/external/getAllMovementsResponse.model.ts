import { MovementResponseModel } from "./movementResponse.model";


export interface GetAllMovementsResponseModel {
    year: string;
    months: MovementsResponseMonthModel[];
}[]

export interface MovementsResponseMonthModel {
    month: string;
    data: MovementResponseModel[];
}
