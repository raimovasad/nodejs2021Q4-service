import server from './app';

import Config from './common/config';


const {PORT} = Config


const start = async()=>{
  try{
    await server.listen(PORT)
  }catch(error){
    server.log.error(error);
    process.exit(1);
  }
}

start()
