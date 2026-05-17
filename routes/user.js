const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// #swagger.path = '/users'
router.get('/', userController.getAllUsers);
// #swagger.path = '/users/{id}'
router.get('/:id', userController.getSingleUser);
// #swagger.path = '/users'
router.post('/', userController.createUser);
// #swagger.path = '/users/{id}'
router.put('/:id', userController.updateUser);
// #swagger.path = '/users/{id}'
router.delete('/:id', userController.deleteUser);

module.exports = router;