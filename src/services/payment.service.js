const { v4: uuid } = require("uuid");

const paymentRepository = require("../repositories/payment.repository");
const paystackService = require("./paystack.service");
const walletService = require("./wallet.service");

const initializePayment = async (user, amount) => {

    const reference = uuid();

    const payment = await paymentRepository.createPayment({

        user,

        amount,

        payment_method: "paystack",

        reference,

        status: "pending",

    });

    const response = await paystackService.initializePayment(

        user.email,

        amount,

        reference

    );

    return {
        payment,
        authorization_url: response.data.authorization_url,
        access_code: response.data.access_code,
        reference,
    };

};

const verifyPayment = async (reference) => {

    const payment = await paymentRepository.findByReference(reference);

    if (!payment) {
        throw new Error("Payment not found");
    }

    if (payment.status === "successful") {
        return payment;
    }

    const response = await paystackService.verifyPayment(reference);

    if (response.data.status === "success") {

        await paymentRepository.updatePayment(payment.id, {

            status: "successful",

            paid_at: new Date(),

        });

        await walletService.fundWallet(

            payment.user.id,

            payment.amount

        );

    }

    return await paymentRepository.findByReference(reference);

};

const paymentHistory = async (userId) => {

    return await paymentRepository.getUserPayments(userId);

};

const requestRefund = async (
    user,
    reference,
    reason,
    refund_method
) => {

    const payment = await paymentRepository.findByReference(reference);

    if (!payment) {
        throw new Error("Payment not found");
    }

    if (payment.status !== "successful") {
        throw new Error("Payment is not successful");
    }

    const refund = await paymentRepository.createRefund({

        payment,

        requested_by: user,

        reason,

        refund_method,

        status: "pending",

    });

    return refund;

};

module.exports = {
    initializePayment,
    verifyPayment,
    paymentHistory,
    verifyPayment,
    requestRefund,
};