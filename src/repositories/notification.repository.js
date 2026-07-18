const AppDataSource = require("../config/database");

const repository = AppDataSource.getRepository("Notification");

const getUserNotifications = async (userId) => {
    return await repository.find({
        where: {
            user: {
                id: userId,
            },
        },
        order: {
            created_at: "DESC",
        },
        relations: {
            user: true,
        },
    });
};

const findById = async (id) => {
    return await repository.findOne({
        where: { id },
        relations: {
            user: true,
        },
    });
};

const updateNotification = async (id, data) => {
    await repository.update(id, data);

    return await repository.findOne({
        where: { id },
    });
};

const createNotification = async (data) => {

    const notification = repository.create(data);

    return await repository.save(notification);

};

module.exports = {
    getUserNotifications,
    findById,
    updateNotification,
    createNotification
};