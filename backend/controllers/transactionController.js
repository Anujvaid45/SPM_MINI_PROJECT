const Transaction = require('../models/transactionModel');

const createTransaction = async (req, res) => {
  try {
    const { planId, amount, paymentMethod } = req.body;
    const transaction = await Transaction.create({
      user: req.user._id,
      plan: planId,
      amount,
      paymentMethod,
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id })
      .populate('plan')
      .sort('-createdAt');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTransaction, getUserTransactions };