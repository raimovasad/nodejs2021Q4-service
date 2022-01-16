import { createConnection,  } from 'typeorm';
import Pino from "../tools/logger";
import config from "../common/config";
import  {User} from "../models/user.model";
import  {Task} from "../models/task.model";
import  {Board} from "../models/board.model";

const {logger} = Pino






const main = async()=>{
    try{
        logger.info('Starting connecting');
    const connection =    await createConnection({
            type:"postgres",
            host:"postgres_db",
            port:5432,
            username:config.POSTGRES_USER,
            password:config.POSTGRES_PASSWORD,
            database: config.POSTGRES_DB,
            entities:[User,Task,Board],
            synchronize:true
        });
        logger.info('Connected to postgres!',connection)
        connection.runMigrations()
    }
    catch(err){ 
        if(err ){
            logger.info(err);
        }
    }
    
}



export default main