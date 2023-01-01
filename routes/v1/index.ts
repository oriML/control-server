// import route handler

import { Router } from "express";
import authRoute from './auth.route'
import usersRoute from './users.route'
import movementsRoute from './movements.route'
import categoriesRoute from './categories.route'

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
    {
        path: '/categories',
        route: categoriesRoute,
    },

];

defaultRoutes.forEach(({ path, route }) => {
    router.use(path, route);
});

export default router;