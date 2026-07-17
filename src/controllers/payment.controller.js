const paymentService = require("../services/payment.service");

const initialize = async (req, res) => {
    try {

        const { amount } = req.body;

        const result = await paymentService.initializePayment(
            req.user,
            amount
        );

        return res.status(200).json({
            success: true,
            message: "Payment initialized successfully",
            data: result,
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};

const verify = async (req, res) => {

    try {

        const { reference } = req.body;

        const payment = await paymentService.verifyPayment(reference);

        return res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            data: payment,
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

const history = async (req, res) => {

    try {

        const payments = await paymentService.paymentHistory(req.user.id);

        return res.status(200).json({
            success: true,
            data: payments,
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

const requestRefund = async (req, res) => {

    try {

        const { reference, reason, refund_method } = req.body;

        const refund = await paymentService.requestRefund(
            req.user,
            reference,
            reason,
            refund_method
        );

        return res.status(201).json({
            success: true,
            data: refund,
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    initialize,
    verify,
    history,
    requestRefund,
};