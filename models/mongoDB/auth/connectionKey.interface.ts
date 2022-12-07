import mongoose from 'mongoose';
// defines the structure of the document id like to store in db.

const connectionKeySchema: mongoose.Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    hash: {
        type: String,
        required: false
    }
}, { timestamps: true });

const ConnectionKey: mongoose.Model<any, {}, {}, {}> = mongoose.model('ConnectionKey', connectionKeySchema);

export default ConnectionKey;