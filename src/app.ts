import FastifyMain,{ FastifyReply, FastifyRequest } from "fastify";
import FastifySwagger from 'fastify-swagger';
import fastifySensible from "fastify-sensible";
import { isHttpError } from "http-errors";
import userRouter from './routers/user.router';
import boardRouter from './routers/boards.router';
import taskRouter from './routers/task.router';
import logger from "./tools/logger";



/**
 * Invokes main fastify instaqnce
 * 
 * 
 * @param logger - fastify server options
 */

const fastify = FastifyMain({logger})

/**
 * Adds a new middleware or functions and their options
 * 
 * @param FastifySwagger - plugin
 * @param options - plugin options
 */

fastify.register(FastifySwagger,{
  exposeRoute: true,
  routePrefix: '/rest-docs',
  swagger:{
    info: {
      title: 'fastify-api',
    description:'REST service with the Fastify',
    version:'0.1.0'},
  }
})


/**
 * Adds userRouter 
 * 
 * 
 * @param userRouter - user router
 */
fastify
  .register(fastifySensible)
  .after(() => {
    fastify.setErrorHandler( (error, request, reply)=>{
      if(isHttpError(error)){
        reply.send(error)
        logger.error(error)
      }
    })
  })

fastify.register(userRouter)

/**
 * Adds boardRouter 
 * 
 * 
 * @param boardRouter - board router
 */

fastify.register(boardRouter)

/**
 * Adds taskRouter 
 * 
 * 
 * @param taskRouter - task router
 */

fastify.register(taskRouter)

/**
 * Send the message about success
 * 
 * @param path - required path to the server
 * @param handler - function that should work when path is called
 * 
 */

fastify.get('/',(req: FastifyRequest,res: FastifyReply)=>{
  res.send('Server has been successfully launched!')
})
 


export default fastify;


// const swaggerUI = require('swagger-ui-express');
// const path = require('path');
// const YAML = require('yamljs');

// const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));


// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));