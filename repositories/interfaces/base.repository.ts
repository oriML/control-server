


/**
 * base repository interface for CRUD implementation
*/

export interface IBaseRepository<T> {

    getById: (id: string) => Promise<T>;
    getByCriteria: (criteria: any) => Promise<T[]>;
    update: (entity: T) => Promise<T>;
    delete: (id: string) => void;

}