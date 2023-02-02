import Mongoose = require("mongoose");

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
// const db = `mongodb+srv://${DB_PROD_USER}:${DB_PROD_PASS}@${DB_PROD_INFO}/${DB_PROD_NAME}`
const db = process.env.NODE_ENV === 'production' ? `mongodb+srv://${DB_PROD_USER}:${DB_PROD_PASS}@${DB_PROD_INFO}/${DB_PROD_NAME}` : `mongodb+srv://${DB_DEV_USER}:${DB_DEV_PASS}@${DB_DEV_INFO}/${DB_DEV_NAME}`;


class DataAccess {
    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;

    constructor() {
        DataAccess.connect();
    }

    static connect(): Mongoose.Connection {
        if (this.mongooseInstance) return this.mongooseInstance;

        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.once("open", () => {
            console.log("Conectado ao mongodb.");
        });

        this.mongooseInstance = Mongoose.connect(db);
        return this.mongooseInstance;
    }

}

DataAccess.connect();
export = DataAccess;