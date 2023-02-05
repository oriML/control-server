import mongoose from "mongoose";
import { IBaseRepository } from "../interface/base.repository.interface";

export class BaseRepository<T extends mongoose.Document> implements IBaseRepository<T>{

    private _model: mongoose.Model<T>;

    constructor(schemaModel: mongoose.Model<T>) {
        this._model = schemaModel;
    }

    async create(item: T) {
        return await this._model.create(item);
    }

    async getByCriteria() {
        return await this._model.find({});
    }

    async getById(_id: string) {
        return await this._model.findById(_id);
    }

    async update(_id: string, item: T) {
        const model = this._model.findById(_id, item);
    }
    async delete(_id: string) {
        await this._model.findByIdAndUpdate(_id, { deleted: true });
    }

}