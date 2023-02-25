import { ErrorsModel } from "../../models/errorsModel";
import { ICriteria } from "../../shared/criteria.shared";
import { IPaginationResponse } from "../../shared/paginationResponse.shared";

interface IBaseService<T> {
    create: (item: T, errors: ErrorsModel) => Promise<void>;
    getByCriteria: (criteria: any) => Promise<IPaginationResponse<T> | null>;
    getById: (_id: string) => void;
    update: (_id: string, item: T, errors: ErrorsModel) => void;
    delete: (_id: string) => void;
    validateModel: (item: T, errors: ErrorsModel) => void;
}

export default IBaseService;