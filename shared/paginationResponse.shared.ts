export interface IPaginationResponse<T> {
    pageSize?: number;
    pageNumber?: number;
    amount?: number;
    totalCount?: number;
    data: T[];
}