import userModel from "../entities/users/user.be"

async function getUserByEmail(email: string) {
    const user = await userModel.findOne({ email });
    return user;
};


export default {
    getUserByEmail
}