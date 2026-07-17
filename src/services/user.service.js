const userRepository = require("../repositories/user.repository");

const getProfile = async (userId) => {
    return await userRepository.findById(userId);
};

const updateProfile = async (userId, data) => {
    return await userRepository.updateUser(userId, data);
};

module.exports = {
    getProfile,
    updateProfile,
};