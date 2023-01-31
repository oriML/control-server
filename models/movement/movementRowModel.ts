import { IMovementModel } from "./movementModel"


export interface MovementRowModel {
    year: number
    month: number
    movements: IMovementModel[]
    sum: number
    count: number
}[]

