import { UserRecord, DecodedIdToken } from 'firebase-admin/auth'

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import admin from '../config/firebase-config'

import { LoginRequestModel } from '../models/auth/external/LoginRequestModel'

import ConnectionKey from '../models/mongoDB/auth/connectionKey.interface'
import { TokensBE } from '../models/auth/general/TokensBE'
import UserModel from '../models/mongoDB/users/user.model'
import { ConnectionKeysBE } from '../models/auth/mdb/connectionKey.mdb'

require('dotenv').config();

async function CreateUserByEmailAndPassword(model: ConnectionKeysBE): Promise<mongoose.Document<unknown, any, typeof UserModel>> {

    const userAuth = new ConnectionKey({ email: model.email, hash: model.hash });
    const userAuthId = await userAuth.save();

    const user = new UserModel({ email: model.email, userAuthId: userAuthId._id })

    return await user.save();
};

async function AuthUserByCriteria(criteria: LoginRequestModel): Promise<ConnectionKeysBE | null> {
    // auth user from db by criteria
    const { email } = criteria;

    return await ConnectionKey.findOne({ email });
};

async function GenerateNewTokenForUser(id: string): Promise<mongoose.Query<any, {}>> {
    // admin.auth().
    // return await ConnectionKey.findOne({ email, password });
};

async function HashPasswordAction(password: string, saltRounds: number = 10): Promise<string | null> {
    return bcrypt.hashSync(password, saltRounds);
};

function ComparePasswordAction(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
};

function CreateJWTTokensAction(id: string): TokensBE {
    const tokens = {} as TokensBE;
    const { REQUEST_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
    tokens.reqToken = CreateJWTRequestToken(id, REQUEST_TOKEN_SECRET);
    tokens.refToken = CreateJWTRefreshToken(id, REFRESH_TOKEN_SECRET);
    return tokens;
};

function CreateJWTRequestToken(id: string, s: string = ''): string {
    return jwt.sign({
        id
    },
        s,
        {
            expiresIn: '150d'
        });

};

function CreateJWTRefreshToken(id: string, s: string = ''): string {
    return jwt.sign({
        id
    },
        s,
        {
            expiresIn: '1d'
        });
};

function CheckIsValidToken(token: string): boolean {
    let res = false;
    jwt.verify(
        token,
        process.env.REQUEST_TOKEN_SECRET ?? '',
        async function (err, decodedToken) {
            if (err) {
                res = false;

            } else {
                res = true;
            }
        }
    )

    return res;
}


export default {
    CreateUserByEmailAndPassword,
    AuthUserByCriteria,
    GenerateNewTokenForUser,
    HashPasswordAction,
    ComparePasswordAction,
    CreateJWTTokensAction,
    CheckIsValidToken
}

