import mongoose from "mongoose";
import { Criteria } from "../../shared/criteria.shared";
import { IBaseRepository } from "../interface/base.repository.interface";

export class BaseRepository<T extends mongoose.Document> implements IBaseRepository<T>{

    private _model: mongoose.Model<T>;

    constructor(schemaModel: mongoose.Model<T>) {
        this._model = schemaModel;
    }

    create(item: T) {
        this._model.create(item);
    }

    getByCriteria() {
        return this._model.find({});
    }

    getById(_id: string) {
        return this._model.findById(_id);
    }

    update(_id: string, item: mongoose.Model<T>) {
        return this._model.findByIdAndUpdate(_id, item);
    }
    delete(_id: string) {
        this._model.findByIdAndUpdate({ deleted: true });
    }

}