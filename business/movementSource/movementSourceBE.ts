import { MovementSourceType } from "../../enums";

export interface MovementSourceBE {
    userId: string;
    createDate: Date;
    updateDate: Date;
    total: number;
    startTotal: number;
    type: MovementSourceType;
}
