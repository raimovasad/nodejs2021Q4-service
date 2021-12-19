import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin'
import boardsService from '../controllers/boards.service';

/**
 * Collects all the board routes
 * 
 * @param fastify - the instace of the server
 * 
 */

async function boardRoutes(fastify: FastifyInstance):Promise<void> {
  fastify.get('/boards', boardsService.getAllBoards);
  fastify.get('/boards/:id', boardsService.getBoardById);
  fastify.post('/boards', boardsService.addBoard);
  fastify.put('/boards/:id', boardsService.updateBoard);
  fastify.delete('/boards/:id', boardsService.removeBoard);
}



export default fp(boardRoutes);
