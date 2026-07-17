const refundRepository = require("../repositories/refund.repository");
const walletService = require("./wallet.service");
const userRepository = require("../repositories/user.repository");
const AppDataSource = require("../config/database");

const approveRefund = async (admin, refundId) => {

    const refund = await refundRepository.findById(refundId);

    if (!refund) {
        throw new Error("Refund not found");
    }

    if (refund.status !== "pending") {
        throw new Error("Refund already processed");
    }

    await walletService.refundWallet(
        refund.requested_by.id,
        refund.payment.amount
    );

    return await refundRepository.updateRefund(
        refundId,
        {
            status: "approved",
            approved_by: admin,
        }
    );

};

const getAllUsers = async () => {

    return await userRepository.getAllUsers();

};

const updateUserStatus = async (id, is_active) => {

    const user = await userRepository.findById(id);

    if (!user) {

        throw new Error("User not found");

    }

    return await userRepository.updateUser(id, {
        is_active,
    });

};

const getDashboard = async () => {

    const users = await AppDataSource
        .getRepository("User")
        .count();

    const payments = await AppDataSource
        .getRepository("Payment")
        .count();

    const refunds = await AppDataSource
        .getRepository("Refund")
        .count();

    return {

        total_users: users,

        total_payments: payments,

        total_refunds: refunds,

    };

};

module.exports = {
    approveRefund,
    getAllUsers,
    updateUserStatus,
    getDashboard,
};