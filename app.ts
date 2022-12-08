import express, { Express } from "express";
import httpStatus from "http-status";
import cors from "cors";
import cookieparser from 'cookie-parser';
import routes from "./routes/v1";
import publicRoutes from "./routes";

// import logger from './utils/logger';
import { ApiError } from './utils/ApiError';

import authMiddleware from './middlewares';

const app: Express = express();

app.use(cors());

app.options('*', cors());

app.use(express.json({ limit: '50mb' }));// allows the app to accept json

app.use(express.urlencoded({
    extended: false,
    limit: '50mb'
}));

app.use('/', (req, res) => res.send({ message: "Hello Vercel test!" }));

app.use(cookieparser());

app.use('/api', publicRoutes);// for public info

app.use('/api/v1', authMiddleware.findCurrentUser) // for personal info -> set it on app.use('v1/', routes)

app.use('/api/v1', routes);

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

export default app;