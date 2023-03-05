import { Model, Document } from 'mongoose';
import { IBaseRepository } from './interfaces/base.repository';


export class baseRepository<T extends Model<any>> implements IBaseRepository<T>{

    private readonly dbContext: T;

    constructor(

    ) {
        this.dbContext = {} as T;
    }

    public async getById(id: string) {
        return await this.dbContext.findById(id).exec();
    };

    public async getByCriteria(criteria: any) {
        const _sort = { ...criteria.sort };
        delete criteria.sort;
        return await this.dbContext.aggregate([
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
            .exec();
    };

    public async update(entity: T) {
        return await this.dbContext.findByIdAndUpdate(entity).exec();
    };

    public async delete(id: string) {
        return await this.dbContext.findByIdAndDelete(id).exec();
    };


}
