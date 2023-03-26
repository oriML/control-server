import mongoose from 'mongoose';
// defines the structure of the document id like to store in db.

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