import mongoose from 'mongoose';
// defines the structure of the document id like to store in db.

const shoppingItemSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    unitType: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: null,
        required: false
    },
    category: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
        default: null,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
}, { timestamps: true });

const ShoppingItem = mongoose.model('shoppingItem', shoppingItemSchema);

export default ShoppingItem;