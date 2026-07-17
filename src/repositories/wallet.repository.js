const AppDataSource = require("../config/database");

const repository = AppDataSource.getRepository("Wallet");

const createWallet = async (data) => {
    const wallet = repository.create(data);
    return await repository.save(wallet);
};

const findByUserId = async (userId) => {
    return await repository.findOne({
        where: {
            user: {
                id: userId,
            },
        },
        relations: {
            user: true,
        },
    });
};

const updateBalance = async (walletId, balance) => {
    await repository.update(walletId, {
        balance,
    });

    return await repository.findOne({
        where: {
            id: walletId,
        },
    });
};

module.exports = {
    createWallet,
    findByUserId,
    updateBalance,
};