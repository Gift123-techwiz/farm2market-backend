const notificationRepository = require("../repositories/notification.repository");

const getNotifications = async (user) => {
    return await notificationRepository.getUserNotifications(user.id);
};

const markAsRead = async (user, notificationId) => {
    const notification = await notificationRepository.findById(notificationId);

    if (!notification) {
        throw new Error("Notification not found");
    }

    if (notification.user.id !== user.id) {
        throw new Error("Unauthorized");
    }

    return await notificationRepository.updateNotification(notificationId, {
        is_read: true,
    });
};

const createNotification = async (
    user,
    title,
    message
) => {

    return await notificationRepository.createNotification({
        user,
        title,
        message,
    });

};

module.exports = {
    getNotifications,
    markAsRead,
    createNotification
};