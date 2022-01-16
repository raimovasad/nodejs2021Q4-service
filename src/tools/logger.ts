import pino, {Logger,TransportMultiOptions} from 'pino';
import config from '../common/config'






const transport = pino.transport(<TransportMultiOptions>{
  targets:[
    {
      level: 'trace',
      target: 'pino-pretty',
      
    },
    {
      level: 'error',
      target: 'pino/file',
      options:{
        destination: './logs/error.log',
        mkdir: true
      }
    },
    {
      level: config.LOGGING_LEVEL,
      target: 'pino/file',
      options:{
        destination: './logs/all.log',
        mkdir: true
      }
    }
    
    

]
})

const logger:Logger  = pino(transport)


export default {logger, transport};