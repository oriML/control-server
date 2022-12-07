// import route handler

import { Router } from "express";
import authRoute from './auth.route'
import usersRoute from './users.route'
import movementsRoute from './movements.route'

import express from 'express';

const router: Router = express.Router();

const defaultRoutes = [

    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/user',
        route: usersRoute,
    },
    {
        path: '/movement',
        route: movementsRoute,
    },

];

defaultRoutes.forEach(({ path, route }) => {
    router.use(path, route);
});

export default router;