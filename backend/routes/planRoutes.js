const express = require('express');
const router = express.Router();
const { getPlans, createPlan } = require('../controllers/planController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getPlans).post(protect, admin, createPlan);

module.exports = router;