const express = require('express');
const router = express.Router();
const { createTransaction, getUserTransactions } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createTransaction).get(protect, getUserTransactions);

module.exports = router;