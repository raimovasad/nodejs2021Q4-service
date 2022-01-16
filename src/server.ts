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
    await server.listen(PORT,'0.0.0.0')
}
start()

const newLocal2 = 'uncaughtException';
process.on(newLocal2,(err => {
 logger.fatal(err.message, newLocal2)
//  transport.on('ready',()=>{
   process.exit(1)
//  })
}))

const newLocal = 'unhandledRejection';
process.on(newLocal,(event: Error)=>{
  logger.fatal(event.message, newLocal)
  process.exit(1)
})