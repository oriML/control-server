import { Model } from "mongoose";
import Movement from "../models/mongoDB/movements/movement.model";
import { baseRepository } from "./base.repository";

export class movementRepository<Movement> extends baseRepository<Model<Movement, {}, {}, {}, any>>{

}