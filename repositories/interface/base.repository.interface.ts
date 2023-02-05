
export interface IBaseRepository<T> {
    create: (item: T) => Promise<T>;
    getByCriteria: () => Promise<T[]>;
    getById: (_id: string) => void;
    update: (_id: string, item: T) => void;
    delete: (_id: string) => void;
}