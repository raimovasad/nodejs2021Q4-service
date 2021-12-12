import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin'
import boardsService from '../controllers/boards.service';


const boardRoutes:FastifyPluginAsync = async(fastify: FastifyInstance)=>{

  fastify.get('/boards',boardsService.getAllBoards);

  fastify.get('/boards/:id',boardsService.getBoardById);

  fastify.post('/boards',boardsService.addBoard)
  fastify.put('/boards/:id',boardsService.updateBoard)
  fastify.delete('/boards/:id',boardsService.removeBoard)

}



export default fp(boardRoutes);
