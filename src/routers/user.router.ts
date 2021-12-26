import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin'
import usersService from '../controllers/user.service';


/**
 * Collects all the user routes
 * 
 * @param fastify - the instace of the server
 * 
 */

async function userRoute(fastify: FastifyInstance) {
  fastify.get('/users', usersService.getAllUsers);
  fastify.get('/users/:id', usersService.getUsersById);
  fastify.post('/users', usersService.addUser);
  fastify.put('/users/:id', usersService.updateUser);
  fastify.delete('/users/:id', usersService.removeUser);
  
}




export default fp(userRoute);
