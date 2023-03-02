import Movement from "../models/mongoDB/movements/movement.model";


export async function getById(id: string) {
    return await Movement.find({ _id: id })
}