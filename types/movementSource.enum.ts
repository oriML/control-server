import { string } from "joi";

export enum MovementSourceType {
    cash = 1,
    bankAccount,
    application
}

export enum MovementType {
    outcome = 1,
    income
}
