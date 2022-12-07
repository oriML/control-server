import userModel from "../models/mongoDB/users/user.model"

async function getUserByEmail(email: string) {
    const user = await userModel.findOne({ email });
    return user;
};


export default {
    getUserByEmail
}