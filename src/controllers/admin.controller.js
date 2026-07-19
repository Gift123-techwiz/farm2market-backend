const adminService = require("../services/admin.service");

const approveRefund = async (req, res) => {

    try {

        const refund = await adminService.approveRefund(
            req.user,
            req.params.id
        );

        return res.json({
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

const rejectRefund = async (req, res) => {

    try {

        const refund = await adminService.rejectRefund(
            req.user,
            req.params.id
        );

        return res.json({
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

const getUsers = async (req, res) => {

    try {

        const users = await adminService.getAllUsers();

        return res.json({
            success: true,
            data: users,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

const updateUserStatus = async (req, res) => {

    try {

        const user = await adminService.updateUserStatus(
            req.params.id,
            req.body.is_active
        );

        return res.json({
            success: true,
            data: user,
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

const getDashboard = async (req, res) => {

    try {

        const dashboard = await adminService.getDashboard();

        return res.json({
            success: true,
            data: dashboard,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

const moderateReview = async (req, res) => {

    try {

        const review = await adminService.moderateReview(
            req.user,
            req.params.id,
            req.body.status,
            req.body.rejection_reason
        );

        return res.json({
            success: true,
            data: review,
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    approveRefund,
    getUsers,
    updateUserStatus,
    getDashboard,
    rejectRefund,
    moderateReview
};