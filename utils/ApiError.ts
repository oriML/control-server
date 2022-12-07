export class ApiError extends Error {
    
    private statusCode: number;
    private isOperational: boolean;
    public stack: any;

    constructor(statusCode: number, message: string, isOperational: boolean = true, stack: string = '') {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}