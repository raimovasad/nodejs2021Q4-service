import server from './app';
import Config from './common/config';
import Pino from './tools/logger';


const {PORT} = Config;
const {logger} = Pino;

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


process.on('uncaughtException',(err => {
 logger.fatal(err.message, ' uncaughtException ')
//  transport.on('ready',()=>{
   process.exit(1)
//  })
}))

process.on('unhandledRejection',(event: Error)=>{
  logger.fatal(event.message, ' uncaughtException ')
  process.exit(1)
})