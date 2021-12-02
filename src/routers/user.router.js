const usersService = require('../controllers/user.service');


function userRoutes(fastify,options,done) {

  fastify.get('/users',usersService.getAllUsers);

  fastify.get('/users/:id',usersService.getUsersById);

  fastify.post('/users',usersService.addUser)
  fastify.put('/users',usersService.updateUser)


}


// router.route('/').get(async (req, res) => {
//   const users = await usersService.getAll();
//   // map user fields to exclude secret fields like "password"
//   res.json(users.map(User.toResponse));
// });

module.exports = userRoutes;
