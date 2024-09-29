const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    userId: String,
    age: String,
    country: String,
    creditDebt: String,
    creditScore: String,
    creditUtilization: String,
    employmentStatus: String,
    monthlyExpenses: String,
    monthlyIncome: String,
    onTimePayments: String,
    openCreditAccounts: String,
    otherDebt: String,
    totalSavings: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Data', DataSchema);