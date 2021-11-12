const express = require('express');
const router = express.Router();
const UserController = require('./../constrollers/UserController');
const { check } = require('express-validator');


router.get('/', UserController.getUserDetails);
router.post('/', 
            check('email').isEmail().withMessage('The email is not valid.'),
            check('customer').isString().withMessage("The value should be string").notEmpty().withMessage('Should not be empty'),
            check('first_name').isString().withMessage("The value should be string").notEmpty().withMessage('Should not be empty'),
            check('roles').isString().withMessage("The value should be string").notEmpty().withMessage('Should not be empty'),
            check('last_name').isString().withMessage("The value should be string").notEmpty().withMessage('Should not be empty'),
            check('is_trial_user').isBoolean().withMessage("The value should be True/False").notEmpty().withMessage('Should not be empty'),
        UserController.createUserDetails);
router.put('/', UserController.updateUserDetails);
router.delete('/', UserController.updateUserDetails);
router.get('/count', UserController.getUserCount);

// auth routes
router.post('/auth/login', UserController.login);

module.exports = router;