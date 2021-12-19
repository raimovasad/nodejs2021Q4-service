import server from './app';

import Config from './common/config';


const {PORT} = Config


/**
 * Starts server working
 * 
 * 
 * 
 */

const start = async():Promise<void>=>{
  try{
    await server.listen(PORT)
  }catch(error){
    server.log.error(error);
    process.exit(1);
  }
}

start()
