import { ErrorsModel } from "../../models/errorsModel";
import { IPaginationResponse } from "../../shared/paginationResponse.shared";

interface IBaseService<T, UIT> {
    create: (item: T, errors: ErrorsModel) => void;
    getByCriteria: (criteria: UIT) => Promise<IPaginationResponse<T> | null>;
    getById: (_id: string) => void;
    update: (_id: string, item: T, errors: ErrorsModel) => void;
    delete: (_id: string) => void;
    validateModel: (item: T, errors: ErrorsModel) => void;
}

export default IBaseService;