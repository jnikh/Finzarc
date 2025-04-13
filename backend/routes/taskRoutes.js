const express= require('express');
const TaskController = require('../controllers/taskController')
const auth = require('../middlewares/auth')
const routes = express.Router();
routes.use(auth);
routes.get('/',TaskController.getAllTask)
routes.post('/createTask',TaskController.createTask)
routes.patch('/updateTask/:id',TaskController.updateTask)
routes.delete('/deletTask/:id',TaskController.deletTask)

module.exports = routes