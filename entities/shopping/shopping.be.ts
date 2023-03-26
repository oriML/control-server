import mongoose from 'mongoose';
// defines the structure of the document id like to store in db.

const shoppingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    shopId: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
}, { timestamps: true });

const Shopping = mongoose.model('shopping', shoppingSchema);

export default Shopping;