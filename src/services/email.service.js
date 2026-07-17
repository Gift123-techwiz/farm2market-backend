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

module.exports = {
    sendVerificationEmail,
    sendResetPasswordEmail,
};