import { UserType } from "../../../enums/user.type";


export interface UserResponseModel {
    name: string | null;
    email: string;
    token: string;
}
