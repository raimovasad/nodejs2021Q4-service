const taskService = require('../controllers/task.service');


function taskRoutes(fastify,options,done) {

  fastify.get('/boards/:boardId/tasks',taskService.getAllTasks);
  fastify.post('/boards/:boardId/tasks',taskService.addTask)
  fastify.get('/boards/:boardId/tasks/:id',taskService.getTaskById);
  fastify.put('/boards/:boardId/tasks/:id',taskService.updateTask)
  fastify.delete('/boards/:boardId/tasks/:id',taskService.removeTask)

    done()
}



module.exports = taskRoutes;
