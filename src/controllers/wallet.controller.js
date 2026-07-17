const walletService = require("../services/wallet.service");

const getWallet = async (req, res) => {

    try {

        const wallet = await walletService.getWallet(req.user.id);

        res.status(200).json({
            success: true,
            data: wallet,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

const fundWallet = async (req, res) => {

    try {

        const { amount } = req.body;

        const wallet = await walletService.fundWallet(
            req.user.id,
            amount
        );

        res.status(200).json({
            success: true,
            message: "Wallet funded successfully",
            data: wallet,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

const withdraw = async (req, res) => {

    try {

        const { amount } = req.body;

        const wallet = await walletService.withdraw(
            req.user.id,
            amount
        );

        res.status(200).json({
            success: true,
            message: "Withdrawal successful",
            data: wallet,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

const getTransactions = async (req, res) => {

    try {

        const transactions =
            await walletService.transactions(req.user.id);

        res.status(200).json({
            success: true,
            data: transactions,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    getWallet,
    fundWallet,
    withdraw,
    getTransactions,
};