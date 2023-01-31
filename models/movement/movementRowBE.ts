import { IMovementBE } from "./movementBE"

export interface MovementRowBE {
    year: number
    month: number
    movements: IMovementBE[]
    sum: number
    count: number
}[]

