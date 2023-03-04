import { Model, Document } from 'mongoose';
import { IBaseRepository } from './interfaces/base.repository';


export class baseRepository<T extends Model<any>> implements IBaseRepository<T>{

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
        const _sort = criteria.sort;
        delete criteria.sort;
        return await new Promise((resolve, reject) => {
            this.dbContext.aggregate([
                {
                    $match: {
                        ...criteria
                    }
                },
                {
                    $sort: {
                        ..._sort
                    }
                }
            ])
        });
    };

    public async update(entity: T): Promise<T> {
        return await new Promise((resolve, reject) => {

        });
    };

    public async delete(id: string) {

    };


}
