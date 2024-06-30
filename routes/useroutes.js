const express = require('express');
const userscontroller = require('../controllers/userscontroller');
const router = express.Router();
router.get('/userlist',userscontroller.userlist);
router.get('/singleuser/(:id)',userscontroller.singleuser);
router.post('/registration',userscontroller.registration);
router.delete('/deleteuser/(:id)',userscontroller.deleteuser);
router.put('/updateuser/(:id)',userscontroller.updateuser);
router.post('/login',userscontroller.login);
router.get('/finddoctor/(:name)',userscontroller.finddoctor);
router.get('/finddoctors',userscontroller.finddoctors);
module.exports = router
