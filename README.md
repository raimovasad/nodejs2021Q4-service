# Docker basics

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install docker](https://docs.docker.com/get-docker/).
- Docker compose - [Download & Install docker-compose](https://docs.docker.com/compose/install/).



### To start clone this repository  ```git clone {repository URL}``` and switch to the branch ```task-7-docker-basics```

 1. With docker:
  
  *(PORT: 4000 by default DB_PORT: 3200 by default)*

  **Type these commands in your vscode console**
    
   - Building and starting app with  ```docker-compose up --build```
   - To see all images  ```docker images -a```
   - To see all running or stopped images  ```docker ps```
   - For checking test  ```docker container exec unique-http npm run test``` (in a new console)
   - For checking lint  ```docker container exec unique-http npm run lint``` (in a new console)
   - Closing app and with cleaning  ```docker-compose down --volume```

 2.Local (without docker):

   - Installing NPM modules  ``` npm install or npm ci```
   - Start the app  ``` npm run start```
   - For checking test ```npm run test``` (in a new console)



## Endpoints

 For `User`, `Board` and `Task` REST endpoints with separate router paths should be created
   
   + `User` (`/users` route)
      * `GET /users` - get all users (remove password from response)
      * `GET /users/:userId` - get the user by id (ex. “/users/123”) (remove password from response)
      * `POST /users` - create user
      * `PUT /users/:userId` - update user
      * `DELETE /users/:userId` - delete user
   + `Board` (`/boards` route)
      * `GET /boards` - get all boards
      * `GET /boards/:boardId` - get the board by id
      * `POST /boards` - create board
      * `PUT /boards/:boardId` - update board
      * `DELETE /boards/:boardId` - delete board
   + `Task` (`boards/:boardId/tasks` route)
      * `GET boards/:boardId/tasks` - get all tasks
      * `GET boards/:boardId/tasks/:taskId` - get the task by id
      * `POST boards/:boardId/tasks` - create task
      * `PUT boards/:boardId/tasks/:taskId` - update task
      * `DELETE boards/:boardId/tasks/:taskId` - delete task


## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
