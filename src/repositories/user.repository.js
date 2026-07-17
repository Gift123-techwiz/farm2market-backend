const AppDataSource = require("../config/database");

const repository = AppDataSource.getRepository("User");

const createUser = async (userData) => {
    const user = repository.create(userData);
    return await repository.save(user);
};

const findByEmail = async (email) => {
    return await repository.findOne({
        where: { email },
    });
};

const findById = async (id) => {
    return await repository.findOne({
        where: { id },
    });
};

const updateUser = async (id, data) => {
    await repository.update(id, data);
    return await findById(id);
};
const findByVerificationToken = async (token) => {
    return await repository.findOne({
        where: {
            verification_token: token,
        },
    });
};

const updateVerification = async (id) => {
    await repository.update(id, {
        is_verified: true,
        verification_token: null,
        verification_token_expires: null,
    });

    return await findById(id);
};

const findByResetToken = async (token) => {
    return await repository.findOne({
        where: {
            reset_password_token: token,
        },
    });
};

const updateResetPassword = async (id, data) => {
    await repository.update(id, data);
    return await findById(id);
};

const getAllUsers = async () => {

    return await repository.find({
        order: {
            created_at: "DESC",
        },
    });

};

module.exports = {
    createUser,
    findByEmail,
    findById,
    updateUser,
    findByVerificationToken,
    updateVerification,
    findByResetToken,
    updateResetPassword,
    getAllUsers,
};