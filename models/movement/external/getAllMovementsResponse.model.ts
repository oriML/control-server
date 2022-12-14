import { MovementModel } from "../mdb/movement.model";
import { MovementResponseModel } from "./movementResponse.model";


export interface GetAllMovementsResponseModel {
    year: number
    month: number
    movements: MovementModel[]
    info: InfoModel
}[]

export interface InfoModel {
    sum: number
    count: number
}
