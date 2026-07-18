const logisticsRequestRepository = require("../repositories/logisticsRequest.repository");
const bookingRepository = require("../repositories/booking.repository");
const logisticsRepository = require("../repositories/logistics.repository");
const notificationService = require("./notification.service");

const createRequest = async (data) => {

    const {
        bookingId,
        logisticsPartnerId,
        ...requestData
    } = data;

    const booking = await bookingRepository.findById(bookingId);

    if (!booking) {
        throw new Error("Booking not found");
    }

    const logisticsPartner = await logisticsRepository.findById(logisticsPartnerId);

    if (!logisticsPartner) {
        throw new Error("Logistics partner not found");
    }

    return await logisticsRequestRepository.create({
        ...requestData,
        booking,
        logistics_partner: logisticsPartner,
    });

};

const getAllRequests = async () => {

    return await logisticsRequestRepository.findAll();

};

const getRequestById = async (id) => {

    const request = await logisticsRequestRepository.findById(id);

    if (!request) {
        throw new Error("Logistics request not found");
    }

    return request;

};

const validTransitions = {

    pending: [
        "accepted",
        "cancelled",
    ],

    accepted: [
        "picked_up",
        "cancelled",
    ],

    picked_up: [
        "in_transit",
    ],

    in_transit: [
        "delivered",
    ],

    delivered: [],

    cancelled: [],

};

const updateRequest = async (user, id, data) => {

    const request = await logisticsRequestRepository.findById(id);

    if (!request) {
        throw new Error("Logistics request not found");
    }

    // Admin can update any request
    const isAdmin = user.role === "admin";

    // Assigned logistics partner can update only their own request
    const isAssignedLogistics =
        request.logistics_partner &&
        request.logistics_partner.user &&
        request.logistics_partner.user.id === user.id;

    if (!isAdmin && !isAssignedLogistics) {
        throw new Error("You are not authorized to update this request");
    }

    if (data.status) {

        const currentStatus = request.status;

        const nextStatuses = validTransitions[currentStatus];

        if (!nextStatuses.includes(data.status)) {
            throw new Error(
                `Cannot change status from ${currentStatus} to ${data.status}`
            );
        }

    }

    const allowedData = {
        status: data.status,
        delivery_date: data.delivery_date,
    };

    const updatedRequest =
        await logisticsRequestRepository.update(
            id,
            allowedData
        );

    const booking =
        await bookingRepository.findById(
            updatedRequest.booking.id
        );

    const user = booking.farmer;

    switch (updatedRequest.status) {

        case "accepted":

            await notificationService.createNotification(
                user,
                "Logistics Accepted",
                "A logistics partner has accepted your request."
            );

            break;

        case "picked_up":

            await notificationService.createNotification(
                user,
                "Produce Picked Up",
                "Your produce has been picked up."
            );

            break;

        case "in_transit":

            await notificationService.createNotification(
                user,
                "Produce In Transit",
                "Your produce is on the way."
            );

            break;

        case "delivered":

            await notificationService.createNotification(
                user,
                "Delivery Completed",
                "Your produce has been delivered."
            );

            break;

        case "cancelled":

            await notificationService.createNotification(
                user,
                "Delivery Cancelled",
                "The logistics request has been cancelled."
            );

            break;

    }

    return updatedRequest;

};

module.exports = {
    createRequest,
    getAllRequests,
    getRequestById,
    updateRequest,
};