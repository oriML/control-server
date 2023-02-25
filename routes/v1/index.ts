// import route handler

import { Router } from "express";
import authRoute from './auth.route'
import usersRoute from './users.route'
import categoriesRoute from './categories.route'

import express from 'express';
import MovementRouter from "./movements.route";

const router: Router = express.Router();
export class BaseRoutes {
    get routes() {
        return defaultRoutes.forEach(({ path, route }) => {
            router.use(path, new route().routes);
        });
    }
}
const defaultRoutes = [

    // {
    //     path: '/auth',
    //     route: authRoute,
    // },
    // {
    //     path: '/user',
    //     route: usersRoute,
    // },
    {
        path: '/movement',
        route: MovementRouter,
    },
    // {
    //     path: '/categories',
    //     route: categoriesRoute,
    // },

];



export default router;