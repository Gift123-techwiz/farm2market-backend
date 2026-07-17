const AppDataSource = require("../config/database");

const repository = AppDataSource.getRepository("WalletTransaction");

const createTransaction = async (data) => {
    const transaction = repository.create(data);
    return await repository.save(transaction);
};

const getWalletTransactions = async (walletId) => {
    return await repository.find({
        where: {
            wallet: {
                id: walletId,
            },
        },
        order: {
            created_at: "DESC",
        },
    });
};

module.exports = {
    createTransaction,
    getWalletTransactions,
};