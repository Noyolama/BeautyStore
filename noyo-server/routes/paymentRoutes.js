const express = require('express');
const router = express.Router();
const { initiatePayment, paymentStatus } = require('../controllers/PaymentController');


router.post("/initiate-payment", initiatePayment);

router.post("/payment-status", paymentStatus);

module.exports = router;