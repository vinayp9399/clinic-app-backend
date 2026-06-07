const express = require('express');
const router = express.Router();
const mongo = require('../config/mongodb_connect');
const appointments = mongo.appointments;

// ─────────────────────────────────────────────
// PATIENT CHATBOT ROUTE
// Returns only medical fields — no personal info
// No name, phoneno, age, gender, doctorid sent
// ─────────────────────────────────────────────
router.get('/patient-chat-data/:patientid', async (req, res) => {
    try {
        const result = await appointments.find(
            { _id: { $exists: true }, phoneno: req.params.patientid },
            {
                // ✅ Safe fields — medical context only
                symptoms: 1,
                prescription: 1,
                date: 1,
                time: 1,
                status: 1,
                followupdate: 1,
                doctorname: 1,
                // ❌ Excluded — personal identifiers
                // name: 0,
                // phoneno: 0,
                // age: 0,
                // gender: 0,
                // doctorid: 0,
                _id: 0
            }
        );

        // Build a safe summary object — no personal data
        const safeSummary = {
            totalAppointments: result.length,
            visited: result.filter(a => a.status === 'visited').length,
            pending: result.filter(a => a.status === 'not visited').length,
            hasFollowups: result.filter(a => a.followupdate).length,
            // Only last 5 appointments, only safe fields
            recentAppointments: result.slice(-5).map(a => ({
                date: a.date,
                time: a.time,
                doctorname: a.doctorname,
                symptoms: a.symptoms,
                prescription: a.prescription,
                status: a.status,
                followupdate: a.followupdate || null
            })),
            upcomingFollowups: result
                .filter(a => a.followupdate)
                .map(a => ({
                    followupdate: a.followupdate,
                    doctorname: a.doctorname,
                    symptoms: a.symptoms
                }))
        };

        res.send({ error: '', message: safeSummary });
    } catch (err) {
        res.status(500).send({ error: 'Server error', message: null });
    }
});

// ─────────────────────────────────────────────
// DOCTOR CHATBOT ROUTE
// Returns only medical/schedule fields
// No patient names, phone numbers, or personal info
// ─────────────────────────────────────────────
router.get('/doctor-chat-data/:doctorid', async (req, res) => {
    try {
        const result = await appointments.find(
            { doctorid: req.params.doctorid },
            {
                // ✅ Safe fields only
                symptoms: 1,
                prescription: 1,
                date: 1,
                time: 1,
                status: 1,
                followupdate: 1,
                // ❌ Excluded — patient personal identifiers
                // name: 0,
                // phoneno: 0,
                // age: 0,
                // gender: 0,
                _id: 0
            }
        );

        const today = new Date();
        const todayStr = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

        // Build safe doctor summary — patients are anonymous
        const safeSummary = {
            totalPatients: result.length,
            visitedPatients: result.filter(a => a.status === 'visited').length,
            pendingPatients: result.filter(a => a.status === 'not visited').length,
            todaysAppointments: result
                .filter(a => a.date === todayStr)
                .map((a, index) => ({
                    slotNumber: index + 1,   // anonymous slot number — no patient name
                    time: a.time,
                    symptoms: a.symptoms,
                    status: a.status
                })),
            todaysFollowups: result
                .filter(a => a.followupdate === todayStr)
                .map((a, index) => ({
                    slotNumber: index + 1,
                    symptoms: a.symptoms,
                    followupdate: a.followupdate
                })),
            // Recent cases for prescription reference — no names
            recentCases: result.slice(-8).map((a, index) => ({
                caseNumber: index + 1,
                date: a.date,
                symptoms: a.symptoms,
                prescription: a.prescription,
                status: a.status,
                followupdate: a.followupdate || null
            })),
            // Symptom frequency — useful for doctor insights
            symptomFrequency: result.reduce((acc, a) => {
                if (a.symptoms) {
                    acc[a.symptoms] = (acc[a.symptoms] || 0) + 1;
                }
                return acc;
            }, {})
        };

        res.send({ error: '', message: safeSummary });
    } catch (err) {
        res.status(500).send({ error: 'Server error', message: null });
    }
});

module.exports = router;
