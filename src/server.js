const { PORT } = require('./common/config');
const fastify = require('./app');

fastify.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);



const start = async()=>{
  try{
    await fastify.listen(PORT)
  }catch(error){
    fastify.log.error(error);
    process.exit(1);
  }
}

start()
