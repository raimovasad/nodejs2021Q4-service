import pino from 'pino';
import server from './app';
import Config from './common/config';
import logger from './tools/logger';


const {PORT} = Config


/**
 * Makes server working
 * 
 * 
 * 
 */

const start = async():Promise<void>=>{
    await server.listen(PORT)
  
}

start()
logger.info('Hello motherfuckers!!')


process.on('uncaughtException', pino.final(logger, (err) => {
  logger.error(err.message, 'uncaughtException')
  process.exit(1)
}))