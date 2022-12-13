import mongoose from 'mongoose';
// defines the structure of the document id like to store in db.

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    userAuthId: {
        type: String,
        required: false
    },
    profileImg: {
        type: String,
        default: null,
        required: false
    },
    mobile: {
        type: String,
        min: 10,
        max: 11,
        default: -1,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;


