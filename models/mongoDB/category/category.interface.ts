import mongoose from 'mongoose';
// defines the structure of the document id like to store in db.

const categorySchema: mongoose.Schema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    movementType: {
        type: Number,
        required: false
    }
}, { timestamps: true });

const Category: mongoose.Model<any, {}, {}, {}> = mongoose.model('Category', categorySchema);

export default Category;