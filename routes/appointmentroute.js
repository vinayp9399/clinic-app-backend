const express = require('express');
const appointmentscontroller = require('../controllers/appointmentscontroller');
const router = express.Router();
router.get('/appointmentslist',appointmentscontroller.appointmentlist);
router.get('/singleappointmentlist/(:id)',appointmentscontroller.singleappointmentlist);
router.post('/addappointment',appointmentscontroller.addappointment);
router.delete('/deleteappointment/(:id)',appointmentscontroller.deleteappointment);
router.put('/updateappointment/(:id)',appointmentscontroller.updateappointment);
router.get('/findappointments/(:doctorid)',appointmentscontroller.findappointments);
router.get('/findpatient/(:doctorid)/(:phoneno)',appointmentscontroller.findpatient);
router.get('/findstatus/(:doctorid)',appointmentscontroller.findstatus);
router.get('/docfollowups/(:doctorid)',appointmentscontroller.docfollowups);
module.exports = router