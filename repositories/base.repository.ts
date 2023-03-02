import mongoose from 'mongoose';
import { IBaseRepository } from './interfaces/base.repository';


export class baseRepository<T extends mongoose.Model<T>> implements IBaseRepository<T>{

    private readonly dbContext: T;

    constructor(

    ) {
        this.dbContext = {} as T;
    }

    public async getById(id: string): Promise<T> {
        return await new Promise((resolve, reject) => {

        });
    };

    public async getByCriteria(criteria: any): Promise<T[]> {
        return await new Promise((resolve, reject) => {

        });
    };

    public async update(entity: T): Promise<T> {
        return await new Promise((resolve, reject) => {

        });
    };

    public async delete(id: string) {

    };


}
