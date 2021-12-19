import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin'
import taskService from '../controllers/task.service';


/**
 * Collects all the taks routes
 * 
 * @param fastify - the instace of the server
 * 
 */

async function taskRoutes(fastify: FastifyInstance) {

  fastify.get('/boards/:boardId/tasks', taskService.getAllTasks);
  fastify.post('/boards/:boardId/tasks', taskService.addTask);
  fastify.get('/boards/:boardId/tasks/:id', taskService.getTaskById);
  fastify.put('/boards/:boardId/tasks/:id', taskService.updateTask);
  fastify.delete('/boards/:boardId/tasks/:id', taskService.removeTask);


}



export default fp(taskRoutes);
