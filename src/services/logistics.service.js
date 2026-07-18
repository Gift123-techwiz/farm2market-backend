const logisticsRepository = require("../repositories/logistics.repository");

const createLogisticsProfile = async (user, data) => {

    const existingProfile = await logisticsRepository.findByUser(user.id);

    if (existingProfile) {
        throw new Error("Logistics profile already exists.");
    }

    return await logisticsRepository.create({
        ...data,
        user,
    });

};

const getAllLogisticsProfiles = async () => {

    return await logisticsRepository.findAll();

};

const getLogisticsProfile = async (id) => {

    const profile = await logisticsRepository.findById(id);

    if (!profile) {
        throw new Error("Logistics profile not found.");
    }

    return profile;

};

const updateLogisticsProfile = async (user, data) => {

    const profile = await logisticsRepository.findByUser(user.id);

    if (!profile) {
        throw new Error("Logistics profile not found.");
    }

    const {rating, ...updateData} = data;

    return await logisticsRepository.update(
        profile.id,
        updateData
    );

};

module.exports = {
    createLogisticsProfile,
    getAllLogisticsProfiles,
    getLogisticsProfile,
    updateLogisticsProfile,
};