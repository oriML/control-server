import userModel from "../entities/user.mdb"

async function getUserByEmail(email: string) {
    const user = await userModel.findOne({ email });
    return user;
};


export default {
    getUserByEmail
}