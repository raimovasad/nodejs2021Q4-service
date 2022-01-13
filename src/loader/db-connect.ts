import {createConnection} from "typeorm";
import Pino from "../tools/logger";
import config from "../common/config";

const {logger} = Pino

const main = async()=>{
    await createConnection({
        type:"postgres",
        host:"localhost",
        port:5432,
        username:config.POSTGRES_USER,
        password:config.POSTGRES_PASSWORD,
        database: config.POSTGRES_DB
    });
    logger.info('Connected to postgres!')
    
}



export default main