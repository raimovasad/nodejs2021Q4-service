import pino, {Logger,TransportMultiOptions} from 'pino';
import config from '../common/config'
// import fs from 'fs'
// import path,{ dirname } from 'path';
// import { fileURLToPath } from 'url';

// const __dirname = dirname(fileURLToPath(import.meta.url));



const transport = pino.transport(<TransportMultiOptions>{
  targets:[
    {
      level: config.LOGGING_LEVEL,
      target: 'pino/file',
      options:{
        destination: './logs/all.log',
        ignore: 'pid,hostname',
        colorize: true
      }
    },
      {
      level: 'error',
      target: 'pino/file',
      
      options:{
        destination: './logs/error.log',
        ignore: 'pid,hostname',
        colorize: true
      }
    }
    

]
})

const logger:Logger  = pino(transport)


export default logger;