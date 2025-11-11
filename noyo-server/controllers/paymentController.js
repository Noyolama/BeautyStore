const axios = require('axios');
const Transaction = require('../models/paymentModel.js');
const Order = require('../models/orderModel.js');
const { generateHmacSha256Hash } = require('../utils/payment.js')

const initiatePayment = async (req, res) => {
    const {
        amount,
        orderId,
        customerOrderId,
        paymentGateway,
        customerName,
        customerEmail,
        customerPhone,
        productName,
    } = req.body;

    if (!paymentGateway) {
        return res.status(400).json({ message: "Payment gateway is required" });
    }

    try {
        const customerDetails = {
            name: customerName,
            email: customerEmail,
            phone: customerPhone,
        };

        const transactionData = {
            customerDetails,
            product_name: productName,
            order_id: orderId,
            amount,
            payment_gateway: paymentGateway,
        };

        let paymentConfig;
        if (paymentGateway === "esewa") {
            const paymentData = {
                amount: amount.toFixed(2),
                failure_url: process.env.FAILURE_URL,
                product_delivery_charge: "0",
                product_service_charge: "0",
                product_code: process.env.ESEWA_MERCHANT_ID,
                signed_field_names: "total_amount,transaction_uuid,product_code",
                success_url: process.env.SUCCESS_URL,
                tax_amount: "0",
                total_amount: amount.toFixed(2),
                transaction_uuid: orderId,
            };

            const data = `total_amount=${paymentData.total_amount},transaction_uuid=${paymentData.transaction_uuid},product_code=${paymentData.product_code}`;
            const signature = generateHmacSha256Hash(data, process.env.ESEWA_SECRET);

            paymentConfig = {
                url: process.env.ESEWA_PAYMENT_URL,
                data: { ...paymentData, signature },
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                responseHandler: (response) => response.request?.res?.responseUrl,
            };
        } else {
            return res.status(400).json({ message: "Invalid payment gateway" });
        }

        // Make payment request
        const payment = await axios.post(paymentConfig.url, paymentConfig.data, {
            headers: paymentConfig.headers,
        });

        const paymentUrl = paymentConfig.responseHandler(payment);
        if (!paymentUrl) {
            throw new Error("Payment URL is missing in the response");
        }

        // Save transaction record
        const transaction = new Transaction(transactionData);
        const tranData = await transaction.save();

        await Order.updateOne({ _id: customerOrderId }, {
            paymentInfo: {
                id: tranData?._id,
                status: tranData?.status,
                transactionId: tranData?.order_id
            },
            orderStatus: 'Processing'
        })

        return res.send({ url: paymentUrl });
    } catch (error) {
        console.error(
            "Error during payment initiation:",
            error.response?.data || error.message
        );
        res.status(500).send({
            message: "Payment initiation failed",
            error: error.response?.data || error.message,
        });
    }
};

const paymentStatus = async (req, res) => {
    const { order_id, customer_order_id, status } = req.body;
    try {
        const transaction = await Transaction.findOne({ order_id });
        if (!transaction) {
            return res.status(400).json({ message: "Transaction not found" });
        }

        const { payment_gateway } = transaction;

        if (status === "FAILED") {
            // Directly update status when failure is reported
            await Transaction.updateOne(
                { order_id },
                { $set: { status: "FAILED", updatedAt: new Date() } }
            );

            await Order.updateOne(
                { _id: customer_order_id },
                { $set: { 'paymentInfo.status': "FAILED" } }
            );

            return res.status(200).json({
                message: "Transaction status updated to FAILED",
                status: "FAILED",
            });
        }

        let paymentStatusCheck;

        if (payment_gateway === "esewa") {
            const paymentData = {
                product_code: process.env.ESEWA_MERCHANT_ID,
                total_amount: transaction.amount,
                transaction_uuid: transaction.order_id,
            };

            const response = await axios.get(
                process.env.ESEWA_PAYMENT_STATUS_CHECK_URL,
                {
                    params: paymentData,
                }
            );

            paymentStatusCheck = response.data;

            if (paymentStatusCheck.status === "COMPLETE") {
                await Transaction.updateOne(
                    { order_id },
                    { $set: { status: "COMPLETED", updatedAt: new Date() } }
                );

                await Order.updateOne(
                    { _id: customer_order_id },
                    { $set: { 'paymentInfo.status': "COMPLETED" } }
                );

                console.log(customer_order_id)

                return res.status(200).json({
                    message: "Transaction status updated successfully",
                    status: "COMPLETED",
                });
            } else {
                await Transaction.updateOne(
                    { order_id },
                    { $set: { status: "FAILED", updatedAt: new Date() } }
                );

                await Order.updateOne(
                    { _id: customer_order_id },
                    { $set: { 'paymentInfo.status': "FAILED" } }
                );

                return res.status(200).json({
                    message: "Transaction status updated to FAILED",
                    status: "FAILED",
                });
            }
        }

        return res.status(400).json({ message: "Invalid payment gateway" });
    } catch (error) {
        console.error("Error during payment status check:", error);
        res.status(500).send({
            message: "Payment status check failed",
            error: error.response?.data || error.message,
        });
    }
};

module.exports = { initiatePayment, paymentStatus };