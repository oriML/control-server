import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import userModel from "../entities/users/user.be";

require('dotenv').config();

class Middleware {

    async decodeToken(req: Request, res: Response, next: NextFunction) {
        try {

            const token = req?.header('authorization')?.split(' ')[1] || '';
            if (token) {

                jwt.verify(
                    token,
                    process.env.REQUEST_TOKEN_SECRET ?? '',
                    async function (err, decodedToken) {
                        if (err) {
                            return res.status(401).json({ message: err.message });

                        } else {
                            next();
                        }
                    }
                )
            }

        } catch (err: any) {
            if (err.code == 'auth/id-token-expired')
                return res.status(403).json({ message: err.message });

            return res.status(401).json({ message: 'Authentication  failed' });
        }
    }

    async findCurrentUser(req: Request, res: Response, next: NextFunction) {
        try {

            const token = req?.header('authorization')?.split(' ')[1] || '';
            if (token && token.length > 0) {

                jwt.verify(
                    token,
                    process.env.REQUEST_TOKEN_SECRET ?? '',
                    async function (err, decodedToken) {
                        if (err) {
                            console.log(err)
                            // logger
                            res.locals.currentUserId = null;
                            next();
                        } else {
                            try {
                                const dt = decodedToken as jwt.JwtPayload;
                                const id = dt.id;
                                const user = await userModel.findById(id);
                                if (user) {
                                    res.locals.currentUserId = id;
                                } else {
                                    res.locals.currentUserId = null;
                                }
                            } catch (err) {
                                console.log(err)
                                // logger
                            }
                            next();
                        }
                    }
                )
            }
        } catch (err: any) {
            res.locals.currentUserId = null;
            if (err.code == 'auth/id-token-expired')
                return res.status(403).json({ error: err });
        }
    }

}

export default new Middleware();