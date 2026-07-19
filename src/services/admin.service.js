const notificationService = require("./notification.service");
const emailService = require("./email.service");
const reviewRepository = require("../repositories/review.repository");
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

    const updatedRefund = await refundRepository.updateRefund(
        refundId,
        {
            status: "approved",
            approved_by: admin,
        }
    );

    await notificationService.createNotification(
        refund.requested_by,
        "Refund Approved",
        `Your refund of ₦${refund.payment.amount} has been approved and credited to your wallet.`
    );

    await emailService.sendRefundApprovedEmail(
        refund.requested_by.email,
        refund.payment.amount
    );

    return updatedRefund;
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

    const userRepository = AppDataSource.getRepository("User");
    const paymentRepository = AppDataSource.getRepository("Payment");
    const refundRepository = AppDataSource.getRepository("Refund");
    const reviewRepository = AppDataSource.getRepository("Review");
    const orderRepository = AppDataSource.getRepository("Order");
    const listingRepository = AppDataSource.getRepository("ProduceListing");

    return {

        total_users: await userRepository.count(),

        total_orders: await orderRepository.count(),

        total_listings: await listingRepository.count(),

        total_payments: await paymentRepository.count(),

        total_refunds: await refundRepository.count(),

        pending_refunds: await refundRepository.count({
            where: {
                status: "pending",
            },
        }),

        pending_reviews: await reviewRepository.count({
            where: {
                status: "pending",
            },
        }),

    };

};

const rejectRefund = async (admin, refundId, reason) => {

    const refund = await refundRepository.findById(refundId);

    if (!refund) {
        throw new Error("Refund not found");
    }

    if (refund.status !== "pending") {
        throw new Error("Refund already processed");
    }

    const updatedRefund = await refundRepository.updateRefund(
        refundId,
        {
            status: "rejected",
        }
    );

    await notificationService.createNotification(
        refund.requested_by,
        "Refund Rejected",
        `Your refund request was rejected. Reason: ${reason}`
    );

    await emailService.sendRefundRejectedEmail(
        refund.requested_by.email
    );

    return updatedRefund;
};

const moderateReview = async (admin, reviewId, status, rejection_reason = null) => {

    const review = await reviewRepository.findById(reviewId);

    if (!review) {
        throw new Error("Review not found");
    }

    if (!["approved", "rejected"].includes(status)) {
        throw new Error("Invalid review status");
    }

    const updatedReview = await reviewRepository.update(
        reviewId,
        {
            status,
            moderated_at: new Date(),
            moderated_by: admin,
            rejection_reason,
        }
    );

    if (status === "approved") {

        await notificationService.createNotification(
            review.reviewer,
            "Review Approved",
            "Your review has been approved and is now visible on Farm2Market."
        );

        await emailService.sendReviewApprovedEmail(
            review.reviewer.email
        );

    } else {

        await notificationService.createNotification(
            review.reviewer,
            "Review Rejected",
            "Your review did not meet our community guidelines."
        );

        await emailService.sendReviewRejectedEmail(
            review.reviewer.email
        );

    }

    return updatedReview;
};

module.exports = {
    approveRefund,
    getAllUsers,
    updateUserStatus,
    getDashboard,
    rejectRefund,
    moderateReview
};