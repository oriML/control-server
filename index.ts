import http from 'http';
import mongoose from 'mongoose';
import app from './app';

require('dotenv').config();

const port = process.env.PORT || 4000;

const {
    DB_DEV_USER,
    DB_DEV_PASS,
    DB_DEV_INFO,
    DB_DEV_NAME,
    DB_PROD_USER,
    DB_PROD_PASS,
    DB_PROD_INFO,
    DB_PROD_NAME
} = process.env;

const db = process.env.NODE_ENV === 'production'
    ?
    `mongodb+srv://${DB_PROD_USER}:${DB_PROD_PASS}@${DB_PROD_INFO}/${DB_PROD_NAME}`
    :
    `mongodb+srv://${DB_DEV_USER}:${DB_DEV_PASS}@${DB_DEV_INFO}/${DB_DEV_NAME}`
    ;

mongoose
    .connect(db)
    .then(() => console.log(`connected to db`))
    .catch((err: string) => console.log(`Error while connect to db: ${err}`))
    .finally(() => app.listen(
        port,
        () => console.log(`running on server: ${port}`)
    ));