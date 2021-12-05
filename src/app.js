const fastify = require('fastify')({})
// const swaggerUI = require('swagger-ui-express');
// const path = require('path');
// const YAML = require('yamljs');
// const userRouter = require('./resources/users/user.router');

// const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));


// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));



fastify.register(require('./routers/user.router'))
fastify.register(require('./routers/boards.router'))
fastify.register(require('./routers/task.router'))

fastify.get('/',(req,res)=>{
  res.send('Server has been successfully launched!')
})
 


module.exports = fastify;
