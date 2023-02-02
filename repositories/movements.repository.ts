import { BaseRepository } from "./base/base.repository";
import { Movement, movementDA } from "../entities/movement.mdb";

export class MovementRepository extends BaseRepository<Movement>{

    constructor() {
        super(movementDA);
    }
}