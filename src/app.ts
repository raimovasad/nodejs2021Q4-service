import FastifyMain,{ FastifyReply, FastifyRequest } from "fastify";
import FastifySwagger from 'fastify-swagger';
import userRouter from './routers/user.router';
import boardRouter from './routers/boards.router';
import taskRouter from './routers/task.router';


const fastify = FastifyMain({
  logger:{ 
    prettyPrint:true
  }
})


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

fastify.register(userRouter)
fastify.register(boardRouter)
fastify.register(taskRouter)

fastify.get('/',(req: FastifyRequest,res: FastifyReply)=>{
  res.send('Server has been successfully launched!')
})
 


export default fastify;


// const swaggerUI = require('swagger-ui-express');
// const path = require('path');
// const YAML = require('yamljs');

// const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));


// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));