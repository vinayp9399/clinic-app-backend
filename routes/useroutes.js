const express = require('express');
const userscontroller = require('../controllers/userscontroller');
const verifyToken = require('../middleware/auth');
const router = express.Router();

// Public routes
router.post('/login', userscontroller.login);
router.post('/registration', userscontroller.registration);
router.post('/refresh', userscontroller.refreshToken);
router.get('/finddoctor/(:name)', userscontroller.finddoctor);
router.get('/finddoctors', userscontroller.finddoctors);

// Protected routes
router.get('/userlist', verifyToken, userscontroller.userlist);
router.get('/singleuser/(:id)', verifyToken, userscontroller.singleuser);
router.delete('/deleteuser/(:id)', verifyToken, userscontroller.deleteuser);
router.put('/updateuser/(:id)', verifyToken, userscontroller.updateuser);

module.exports = router
