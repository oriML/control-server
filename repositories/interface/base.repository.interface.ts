import mongoose from "mongoose";

export interface IBaseRepository<T> {
    create: (item: T) => void;
    getByCriteria: () => void;
    getById: (_id: string) => void;
    update: (_id: string, item: mongoose.Model<T>) => void;
    delete: (_id: string) => void;
}