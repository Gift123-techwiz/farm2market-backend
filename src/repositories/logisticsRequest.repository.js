const AppDataSource = require("../config/database");

const repository = AppDataSource.getRepository("LogisticsRequest");

const create = async (data) => {
    const request = repository.create(data);
    return await repository.save(request);
};

const findAll = async () => {
    return await repository.find({
        relations: {
            booking: true,
            logistics_partner: true,
        },
    });
};

const findById = async (id) => {

    return await repository.findOne({
        where: {
            id,
        },
        relations: {
            booking: true,
            logistics_partner: {
                user: true,
            },
        },
    });

};

const update = async (id, data) => {
    await repository.update(id, data);
    return await findById(id);
};

module.exports = {
    create,
    findAll,
    findById,
    update,
};