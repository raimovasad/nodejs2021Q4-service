const boardsService = require('../controllers/boards.service');


function boardRoutes(fastify,options,done) {

  fastify.get('/boards',boardsService.getAllBoards);

  fastify.get('/boards/:id',boardsService.getBoardById);

  fastify.post('/boards',boardsService.addBoard)
  fastify.put('/boards/:id',boardsService.updateBoard)
  fastify.delete('/boards/:id',boardsService.removeBoard)

    done()

}



module.exports = boardRoutes;
