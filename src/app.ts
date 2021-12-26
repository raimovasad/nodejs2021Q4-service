import FastifyMain,{ FastifyReply, FastifyRequest,FastifyInstance } from "fastify";
import FastifySwagger from 'fastify-swagger';
import fastifySensible from "fastify-sensible";
import { isHttpError } from "http-errors";
import fp from "fastify-plugin";
import userRouter from './routers/user.router';
import boardRouter from './routers/boards.router';
import taskRouter from './routers/task.router';
import LOG from "./tools/logger";


const {logger} = LOG



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


  fastify. register(fp(async(Fastify: FastifyInstance)=>{
    Fastify.addHook('onRequest',(req,res,done)=>{
      if(req.params){
        logger.info({req_url:req.url, query_params: req.query})
      }
      done()
    })
  }))

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

// Central error handling for routes

fastify
  .register(fastifySensible)
  .after(() => {
    fastify.setErrorHandler( (error, request, reply)=>{
      if(isHttpError(error)){
        reply.send(error.message)
        logger.error(error.message)
      }
    })
  })
 


export default fastify;


