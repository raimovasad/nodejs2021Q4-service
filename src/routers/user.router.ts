import { FastifyContext, FastifyInstance, FastifyRegisterOptions } from 'fastify';
import usersService from '../controllers/user.service';


function userRoutes(fastify: FastifyInstance,options: FastifyRegisterOptions<FastifyContext>,done: ) {

  fastify.get('/users',usersService.getAllUsers);

  fastify.get('/users/:id',usersService.getUsersById);

  fastify.post('/users',usersService.addUser)
  fastify.put('/users/:id',usersService.updateUser)
  fastify.delete('/users/:id',usersService.removeUser)


    done()

}




export default userRoutes;
