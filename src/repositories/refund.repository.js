const AppDataSource = require("../config/database");

const repository = AppDataSource.getRepository("Refund");

const findById = async (id) => {

    return await repository.findOne({
        where: {
            id,
        },
        relations: {
            payment: true,
            requested_by: true,
            approved_by: true,
        },
    });

};

const updateRefund = async (id, data) => {

    await repository.update(id, data);

    return await findById(id);

};

module.exports = {
    findById,
    updateRefund,
};