const usersService = require('../controllers/user.service');


function userRoutes(fastify,options,done) {

  fastify.get('/users',usersService.getAllUsers);

  fastify.get('/users/:id',usersService.getUsersById);

  fastify.post('/users',usersService.addUser)
  fastify.put('/users/:id',usersService.updateUser)
  fastify.delete('/users/:id',usersService.removeUser)


    done()

}




module.exports = userRoutes;
