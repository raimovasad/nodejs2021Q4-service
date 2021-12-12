import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin'
import usersService from '../controllers/user.service';


const userRoute: FastifyPluginAsync = async  (fastify: FastifyInstance )=>{

  fastify.get('/users',usersService.getAllUsers);

  fastify.get('/users/:id',usersService.getUsersById);

  fastify.post('/users',usersService.addUser)
  fastify.put('/users/:id',usersService.updateUser)
  fastify.delete('/users/:id',usersService.removeUser)


}




export default fp(userRoute);
