const AppDataSource = require("../config/database");

const repository = AppDataSource.getRepository("Payment");
const refundRepository = AppDataSource.getRepository("Refund");

const createPayment = async (data) => {
    const payment = repository.create(data);
    return await repository.save(payment);
};

const findByReference = async (reference) => {
    return await repository.findOne({
        where: {
            reference,
        },
        relations: {
            order: true,
            refunds: true,
        },
    });
};

const updatePayment = async (id, data) => {

    await repository.update(id, data);

    return await repository.findOne({
        where: {
            id,
        },
        relations: {
            order: true,
        },
    });
};

const getUserPayments = async (userId) => {

    return await repository.find({
        where: {
            user: {
                id: userId,
            },
        },
        order: {
            paid_at: "DESC",
        },
    });

};

const createRefund = async (data) => {

    const refund = refundRepository.create(data);

    return await refundRepository.save(refund);

};

module.exports = {
    createPayment,
    findByReference,
    updatePayment,
    getUserPayments,
    createRefund,
};