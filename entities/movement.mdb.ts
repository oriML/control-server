import mongoose from 'mongoose';
import { IMovementCategoryModel } from '../models/category/categoryModel';
import DataAccess from '../dal';

const _mongoose = DataAccess.mongooseInstance;
const _connection = DataAccess.mongooseConnection;

const movementSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    notes: {
        type: String,
        required: true
    },
    source: {
        type: Number,
        required: false
    },
    type: {
        type: Number,
        default: null,
        required: false
    },
    category: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
        default: null,
        required: false
    },
    year: {
        type: Number,
        default: new Date().getFullYear()
    },
    month: {
        type: Number,
        default: new Date().getMonth()
    },
    day: {
        type: Number,
        default: new Date().getDay()
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    movementDate: {
        type: Date,
        default: () => Date.now()
    },
}, { timestamps: true });

const Movement = mongoose.model('Movement', movementSchema);
export default Movement;


class MovementSchema {
    static get schema() {
        const schema = new mongoose.Schema({
            userId: {
                type: String,
                required: false
            },
            price: {
                type: Number,
                required: false
            },
            notes: {
                type: String,
                required: true
            },
            source: {
                type: Number,
                required: false
            },
            type: {
                type: Number,
                default: null,
                required: false
            },
            category: {
                type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
                default: null,
                required: false
            },
            year: {
                type: Number,
                default: new Date().getFullYear()
            },
            month: {
                type: Number,
                default: new Date().getMonth()
            },
            day: {
                type: Number,
                default: new Date().getDay()
            },
            createdAt: {
                type: Date,
                default: Date.now()
            },
            movementDate: {
                type: Date,
                default: () => Date.now()
            },
        }, { timestamps: true })

        return schema;
    }
}
export interface Movement extends mongoose.Document {
    userId: string;
    movementDate: string;
    price: number;
    year: number;
    month: number;
    day: number;
    notes: string;
    source: string;
    type: number;
    category: IMovementCategoryModel;
}

export const movementDA = _connection.model<Movement>("Movement", MovementSchema.schema);
