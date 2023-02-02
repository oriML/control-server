import { ICriteria } from "../../shared/criteria.shared";
import { IPaginationResponse } from "../../shared/paginationResponse.shared";

interface IBaseService<T, UIT> {
    create: (item: T) => void;
    getByCriteria: (criteria: UIT) => Promise<IPaginationResponse<T> | null>;
    getById: (_id: string) => void;
    update: (_id: string, item: T) => void;
    delete: (_id: string) => void;
}

export default IBaseService;