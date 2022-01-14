import {createConnection} from "typeorm";
import Pino from "../tools/logger";
import config from "../common/config";

const {logger} = Pino

const main = async()=>{
    try{
        await createConnection({
            type:"postgres",
            database: config.POSTGRES_DB,
            username:config.POSTGRES_USER,
            password:config.POSTGRES_PASSWORD,
            logging: true,
            synchronize: true,
            host:"postgres",
            port:5433,
        });
        logger.info('Connected to postgres!')
    }
    catch(err){
        if(err instanceof Error){
            throw new Error(err.message);
        }
    }
    
}



export default main