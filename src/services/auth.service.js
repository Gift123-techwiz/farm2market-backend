const notificationService = require("./notification.service");
const userRepository = require("../repositories/user.repository");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");
const generateOTP = require("../utils/otp");
const emailService = require("./email.service");
const walletRepository = require("../repositories/wallet.repository");

const register = async (userData) => {

    const existingUser = await userRepository.findByEmail(userData.email);

    if (existingUser) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await hashPassword(userData.password);

    const otp = generateOTP();

    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    const user = await userRepository.createUser({
        ...userData,
        password: hashedPassword,
        verification_token: otp,
        verification_token_expires: expiry,
    });

    await walletRepository.createWallet({
        user,
        balance: 0,
    });

    await notificationService.createNotification(
        user,
        "Welcome to Farm2Market",
        "Your account has been created successfully. Verify your email to unlock all features."
    );

    const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
    });

    await emailService.sendVerificationEmail(
        user.email,
        otp
    );

    return {
        user: {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            role: user.role,
            is_verified: user.is_verified,
        },
        token,
    };
};

const login = async (email, password) => {

    const user = await userRepository.findByEmail(email);

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordCorrect = await comparePassword(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new Error("Invalid email or password");
    }

    if (!user.is_active) {
        throw new Error("Account has been disabled");
    }

    const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
    });

    return {
        user: {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            role: user.role,
            is_verified: user.is_verified,
        },
        token,
    };

};

const verifyEmail = async (token) => {

    const user = await userRepository.findByVerificationToken(token);

    if (!user) {
        throw new Error("Invalid verification code");
    }

    if (user.verification_token_expires < new Date()) {
        throw new Error("Verification code has expired");
    }

    await userRepository.updateVerification(user.id);

    await notificationService.createNotification(
        user,
        "Email Verified",
        "Your email has been verified successfully."
    );

    return {
        message: "Email verified successfully",
    };
};

const resendVerification = async (email) => {

    const user = await userRepository.findByEmail(email);

    if (!user) {
        throw new Error("User not found");
    }

    if (user.is_verified) {
        throw new Error("Email already verified");
    }

    const otp = generateOTP();

    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    await userRepository.updateUser(user.id, {
        verification_token: otp,
        verification_token_expires: expiry,
    });

    await emailService.sendVerificationEmail(
        user.email,
        otp
    );

    return {
        message: "Verification code sent successfully.",
    };
};

const forgotPassword = async (email) => {

    const user = await userRepository.findByEmail(email);

    if (!user) {
        throw new Error("User not found");
    }

    const otp = generateOTP();

    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    await userRepository.updateResetPassword(user.id, {
        reset_password_token: otp,
        reset_password_token_expires: expiry,
    });

    await emailService.sendResetPasswordEmail(
        user.email,
        otp
    );

    return {
        message: "Password reset code sent successfully.",
    };
};

const resetPassword = async (token, password) => {

    const user = await userRepository.findByResetToken(token);

    if (!user) {
        throw new Error("Invalid reset code");
    }

    if (user.reset_password_token_expires < new Date()) {
        throw new Error("Reset code has expired");
    }

    const hashedPassword = await hashPassword(password);

    await userRepository.updateResetPassword(user.id, {
        password: hashedPassword,
        reset_password_token: null,
        reset_password_token_expires: null,
    });

    await notificationService.createNotification(
        user,
        "Password Changed",
        "Your password has been changed successfully. If this wasn't you, contact support immediately."
    );

    return {
        message: "Password reset successful.",
    };
};

module.exports = {
    register,
    login,
    verifyEmail,
    resendVerification,
    forgotPassword,
    resetPassword,
};