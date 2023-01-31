interface IBaseBusiness<T> {
    create: (item: T, callback: (error: any, result: T) => void) => void;
    getByCriteria: (callback: (error: any, result: T) => void) => void;
    getById: (_id: string, callback: (error: any, result: T) => void) => void;
    update: (_id: string, item: T, callback: (error: any, result: T) => void) => void;
    delete: (_id: string, callback: (error: any, result: T) => void) => void;
}

export default IBaseBusiness;