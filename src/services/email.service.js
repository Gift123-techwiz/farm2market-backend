const transporter = require("../config/mail");

const sendVerificationEmail = async (email, otp) => {

    await transporter.sendMail({

        from: process.env.MAIL_FROM,

        to: email,

        subject: "Verify Your Farm2Market Account",

        html: `
            <h2>Welcome to Farm2Market</h2>

            <p>Your verification code is:</p>

            <h1>${otp}</h1>

            <p>This code expires in 10 minutes.</p>
        `,
    });

};

const sendResetPasswordEmail = async (email, otp) => {

    await transporter.sendMail({

        from: process.env.MAIL_FROM,

        to: email,

        subject: "Farm2Market Password Reset",

        html: `
            <h2>Password Reset</h2>

            <p>Your password reset code is:</p>

            <h1>${otp}</h1>

            <p>This code expires in 10 minutes.</p>
        `,
    });

};

const sendRefundApprovedEmail = async (email, amount) => {

    await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: email,
        subject: "Refund Approved",

        html: `
            <h2>Refund Approved</h2>

            <p>Your refund request has been approved.</p>

            <p>₦${amount} has been credited to your wallet.</p>
        `,
    });

};

const sendRefundRejectedEmail = async (email) => {

    await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: email,
        subject: "Refund Request Update",

        html: `
            <h2>Refund Request</h2>

            <p>Unfortunately your refund request was not approved.</p>

            <p>If you believe this is an error, please contact support.</p>
        `,
    });

};

const sendReviewApprovedEmail = async (email) => {

    await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: email,
        subject: "Review Approved",

        html: `
            <h2>Review Approved</h2>

            <p>Your review has been approved and is now visible on Farm2Market.</p>
        `,
    });

};

const sendReviewRejectedEmail = async (email) => {

    await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: email,
        subject: "Review Rejected",

        html: `
            <h2>Review Rejected</h2>

            <p>Your review did not meet our community guidelines and has been rejected.</p>
        `,
    });

};

const sendOrderPlacedEmail = async (email) => {

    await transporter.sendMail({

        from: process.env.MAIL_FROM,

        to: email,

        subject: "Order Placed Successfully",

        html: `
            <h2>Order Placed</h2>

            <p>Your order has been placed successfully.</p>

            <p>You will be notified once the farmer responds.</p>
        `,
    });

};

const sendOrderAcceptedEmail = async (email) => {

    await transporter.sendMail({

        from: process.env.MAIL_FROM,

        to: email,

        subject: "Order Accepted",

        html: `
            <h2>Order Accepted</h2>

            <p>Great news!</p>

            <p>Your order has been accepted by the farmer.</p>
        `,
    });

};

const sendOrderCancelledEmail = async (email) => {

    await transporter.sendMail({

        from: process.env.MAIL_FROM,

        to: email,

        subject: "Order Cancelled",

        html: `
            <h2>Order Cancelled</h2>

            <p>Your order has been cancelled.</p>
        `,
    });

};

const sendOrderCompletedEmail = async (email) => {

    await transporter.sendMail({

        from: process.env.MAIL_FROM,

        to: email,

        subject: "Order Completed",

        html: `
            <h2>Order Completed</h2>

            <p>Your order has been completed successfully.</p>

            <p>Thank you for using Farm2Market.</p>
        `,
    });

};

const sendNewOrderReceivedEmail = async (email) => {

    await transporter.sendMail({

        from: process.env.MAIL_FROM,

        to: email,

        subject: "New Order Received",

        html: `
            <h2>New Order Received</h2>

            <p>A buyer has placed an order for one of your produce listings.</p>

            <p>Please log in to Farm2Market to review and process the order.</p>
        `,
    });

};

module.exports = {
    sendVerificationEmail,
    sendResetPasswordEmail,
    sendRefundApprovedEmail,
    sendRefundRejectedEmail,
    sendReviewApprovedEmail,
    sendReviewRejectedEmail,
    sendOrderPlacedEmail,
    sendOrderAcceptedEmail,
    sendOrderCancelledEmail,
    sendOrderCompletedEmail,
    sendNewOrderReceivedEmail
};