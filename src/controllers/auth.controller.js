const authService = require("../services/auth.service");

const register = async (req, res) => {
    try {
        const result = await authService.register(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const result = await authService.login(email, password);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        });

    } catch (error) {

        res.status(401).json({
            success: false,
            message: error.message,
        });

    }

};

const verifyEmail = async (req, res) => {

    try {

        const { token } = req.body;

        const result = await authService.verifyEmail(token);

        res.status(200).json({
            success: true,
            ...result,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

const resendVerification = async (req, res) => {

    try {

        const { email } = req.body;

        const result = await authService.resendVerification(email);

        res.status(200).json({
            success: true,
            message: "Verification code resent",
            data: result,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

const forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        const result = await authService.forgotPassword(email);

        res.status(200).json({
            success: true,
            ...result,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

const resetPassword = async (req, res) => {

    try {

        const { token, password } = req.body;

        const result = await authService.resetPassword(token, password);

        res.status(200).json({
            success: true,
            ...result,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    register,
    login,
    verifyEmail,
    resendVerification,
    forgotPassword,
    resetPassword
};