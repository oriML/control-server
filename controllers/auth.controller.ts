import { NextFunction, Request, Response } from 'express';
import { LoginRequestModel } from '../models/auth/external/LoginRequestModel';
import AuthService from '../services/auth.service';
import { UserResponseModel } from '../models/user/external/userResponse.model';
import { UserType } from '../types/user.type';
import UserService from '../services/users.service';
import { ConnectionKeysBE } from '../models/auth/mdb/connectionKey.mdb';


function LoginByEmailAndPassword(req: Request | any, res: Response) {

    const { email, password } = req.body;

    const userCriteria: LoginRequestModel = { email, password };

    AuthService.AuthUserByCriteria(userCriteria)
        .then((authUser) => {
            // check if user password is valid
            if (authUser != null) {
                const isUserPasswordValid = AuthService.ComparePasswordAction(password, authUser.hash);
                if (isUserPasswordValid) {
                    // get user from db
                    UserService.getUserByEmail(email)
                        .then((user) => {
                            if (user) {
                                const userId = user?._id.toString();
                                const tokens = AuthService.CreateJWTTokensAction(userId);
                                const userResponse: UserResponseModel = {
                                    name: null,
                                    email: email,
                                    token: tokens.reqToken
                                };

                                res.cookie('jwt', tokens.refToken, {
                                    httpOnly: true,
                                    sameSite: 'none',
                                    secure: true,
                                    maxAge: 24 * 60 * 60 * 1000
                                });

                                return res.send(userResponse);
                            }
                        })
                        .catch((err) => {
                            throw new Error(err);
                        })
                }
            } else {
                return res.sendStatus(401);
            }
        })
        .catch(err => {
            res.status(404).send({ message: err.message });
        })
};

async function CreateUserByEmailAndPasswordAction(req: Request, res: Response, next: NextFunction) {

    const { email, password } = req.body;
    // hash password
    const hash = await AuthService.HashPasswordAction(password);

    if (hash != null) {

        const model: ConnectionKeysBE = { email, hash: hash };
        // create user auth doc and user doc
        const user = await AuthService.CreateUserByEmailAndPassword(model);
        // create jwt request and refresh tokens
        const tokens = AuthService.CreateJWTTokensAction(user._id as string); // {reqToken, refToken}

        const userResponse: UserResponseModel = {
            name: null,
            email: email,
            token: tokens.reqToken
        };

        res.cookie('jwt', tokens.refToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.send(userResponse);
    }

    return res.status(500).send(`שגיאת שרת`);

};

export default {
    LoginByEmailAndPassword,
    CreateUserByEmailAndPasswordAction
};