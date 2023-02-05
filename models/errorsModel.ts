export class ErrorsModel {
    constructor() {
        this.errors = [];
    }
    public errors: string[];
    public isEmpty(): boolean {
        return this.errors.length > 0 ? true : false;
    }
    public add(err: string) {
        this.errors.push(err);
    }
}