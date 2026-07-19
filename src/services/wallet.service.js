const notificationService = require("./notification.service");
const { v4: uuid } = require("uuid");

const walletRepository = require("../repositories/wallet.repository");
const walletTransactionRepository = require("../repositories/walletTransaction.repository");

const getWallet = async (userId) => {

    const wallet = await walletRepository.findByUserId(userId);

    if (!wallet) {
        throw new Error("Wallet not found");
    }

    return wallet;
};

const fundWallet = async (userId, amount) => {

    const wallet = await walletRepository.findByUserId(userId);

    if (!wallet) {
        throw new Error("Wallet not found");
    }

    const newBalance = Number(wallet.balance) + Number(amount);

    await walletRepository.updateBalance(
        wallet.id,
        newBalance
    );

    await walletTransactionRepository.createTransaction({
        wallet,
        amount,
        transaction_type: "credit",
        reference: uuid(),
        description: "Wallet funding",
    });

    return await walletRepository.findByUserId(userId);
};

const withdraw = async (userId, amount) => {

    const wallet = await walletRepository.findByUserId(userId);

    if (!wallet) {
        throw new Error("Wallet not found");
    }

    if (Number(wallet.balance) < Number(amount)) {
        throw new Error("Insufficient wallet balance");
    }

    const newBalance = Number(wallet.balance) - Number(amount);

    await walletRepository.updateBalance(
        wallet.id,
        newBalance
    );

    await walletTransactionRepository.createTransaction({
        wallet,
        amount,
        transaction_type: "withdrawal",
        reference: uuid(),
        description: "Wallet withdrawal",
    });

    return await walletRepository.findByUserId(userId);
};

const transactions = async (userId) => {

    const wallet = await walletRepository.findByUserId(userId);

    if (!wallet) {
        throw new Error("Wallet not found");
    }

    return await walletTransactionRepository.getWalletTransactions(wallet.id);
};

const refundWallet = async (userId, amount) => {

    const wallet = await walletRepository.findByUserId(userId);

    if (!wallet) {
        throw new Error("Wallet not found");
    }

    const newBalance = Number(wallet.balance) + Number(amount);

    await walletRepository.updateBalance(
        wallet.id,
        newBalance
    );

    await walletTransactionRepository.createTransaction({
        wallet,
        amount,
        transaction_type: "refund",
        reference: uuid(),
        description: "Wallet refund",
    });

    return wallet;
};



module.exports = {
    getWallet,
    fundWallet,
    withdraw,
    transactions,
    refundWallet
};