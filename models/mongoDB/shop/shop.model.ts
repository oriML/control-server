import mongoose from 'mongoose';
// defines the structure of the document id like to store in db.

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
}, { timestamps: true });

const Shop = mongoose.model('shop', shopSchema);

export default Shop;