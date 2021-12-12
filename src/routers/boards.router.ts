import { FastifyInstance, FastifyPluginCallback, FastifyRegister } from 'fastify';
import boardsService from '../controllers/boards.service';


function boardRoutes(fastify: FastifyInstance,options: FastifyRegister,done: FastifyPluginCallback<Error>) {

  fastify.get('/boards',boardsService.getAllBoards);

  fastify.get('/boards/:id',boardsService.getBoardById);

  fastify.post('/boards',boardsService.addBoard)
  fastify.put('/boards/:id',boardsService.updateBoard)
  fastify.delete('/boards/:id',boardsService.removeBoard)

    done(err?: Error):void

}



export default boardRoutes;
