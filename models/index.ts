export interface PaginationRequest<T> {
    nextId?: number;
    previousId?: number;
    data: T[];
    count: number;
    sum?: number;
}