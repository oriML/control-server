import { NextFunction, Request, Response } from 'express';
import { LoginRequestModel } from '../models/auth/login-request.model';
import AuthService from '../services/auth.service.bl';
import { UserResponseModel } from '../models/user/user-response.model';
import UserService from '../services/users.service.bl';
import { ConnectionKeysBE } from '../entities/auth/connection-key.interface';
import { UserRegisterModel } from '../models/auth/user-register.model';


async function LoginByEmailAndPassword(req: Request | any, res: Response) {
    try {

        const { email, password } = req.body;

        const userCriteria: LoginRequestModel = { email, password };

        const authUser = await AuthService.AuthUserByCriteria(userCriteria)
        // check if user password is valid
        if (authUser != null) {

            const isUserPasswordValid = AuthService.ComparePasswordAction(password, authUser.hash);

            if (isUserPasswordValid) {
                // get user from db
                const user = await UserService.getUserByEmail(email);

                if (user) {
                    const userId = user._id.toString();
                    const tokens = AuthService.CreateJWTTokensAction(userId);
                    const userResponse: UserResponseModel = {
                        name: user.name,
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

            } else {
                throw Error('סיסמא שגויה');
            }
        } else {
            throw Error('משתמש לא רשום')
        }
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).send(error.message)

        throw Error('unkown');
    }
};

async function CreateUserByEmailAndPasswordAction(req: Request, res: Response, next: NextFunction) {
    try {

        const { email, password, name } = req.body;
        // hash password
        const hash = await AuthService.HashPasswordAction(password);

        if (hash != null) {

            const model: ConnectionKeysBE = { email, hash: hash };
            // create user auth doc and user doc
            const userAuth = await AuthService.CreateUserConnectionKeysByEmailAndPassword(model);

            const userRegisterModel: UserRegisterModel = {
                email,
                name,
                userAuthId: userAuth._id as string
            };

            const user = await AuthService.CreateUserByEmailAndPassword(userRegisterModel)
            // create jwt request and refresh tokens
            const tokens = AuthService.CreateJWTTokensAction(user._id as string); // {reqToken, refToken}

            const userResponse: UserResponseModel = {
                name,
                email,
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

        throw Error(`שגיאת שרת`);

    } catch (error) {
        if (error instanceof Error)
            return res.status(500).send(error.message)

        throw Error('unkown');
    }
};

export default {
    LoginByEmailAndPassword,
    CreateUserByEmailAndPasswordAction
};