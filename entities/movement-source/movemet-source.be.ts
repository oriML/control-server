import mongoose from 'mongoose';
// defines the structure of the document id like to store in db.

const movementSourceSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: false
    },
    total: {
        type: Number,
        required: false
    },
    startTotal: {
        type: Number,
        required: true
    },
    type: {
        type: Number,
        default: null,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updateDate: {
        type: Date,
        default: () => Date.now()
    },
}, { timestamps: true });

const MovementSource = mongoose.model('MovementSource', movementSourceSchema);

export default MovementSource;