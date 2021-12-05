const { PORT } = require('./common/config');
const fastify = require('./app');





const start = async()=>{
  try{
    await fastify.listen(PORT)
  }catch(error){
    fastify.log.error(error);
    process.exit(1);
  }
}

start()
