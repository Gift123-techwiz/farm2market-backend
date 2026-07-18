const AppDataSource = require("../config/database");

const repository = AppDataSource.getRepository("Booking");

const findById = async (id) => {

    return await repository.findOne({
        where: {
            id,
        },
        relations: {
            farmer: true,
            coldroom: true,
        },
    });

};

module.exports = {
    findById,
};