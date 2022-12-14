import { UserType } from "../../../types/user.type";


export interface UserResponseModel {
    name: string | null;
    email: string;
    token: string;
}
