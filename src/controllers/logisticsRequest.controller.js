const logisticsRequestService = require("../services/logisticsRequest.service");

const createRequest = async (req, res) => {

    try {

        const request = await logisticsRequestService.createRequest(req.body);

        return res.status(201).json({
            success: true,
            data: request,
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

const getAllRequests = async (req, res) => {

    try {

        const requests = await logisticsRequestService.getAllRequests();

        return res.status(200).json({
            success: true,
            data: requests,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

const getRequestById = async (req, res) => {

    try {

        const request = await logisticsRequestService.getRequestById(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            data: request,
        });

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message,
        });

    }

};

const updateRequest = async (req, res) => {

    try {

        const request = await logisticsRequestService.updateRequest(
            req.user,
            req.params.id,
            req.body
        );

        return res.status(200).json({
            success: true,
            data: request,
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    createRequest,
    getAllRequests,
    getRequestById,
    updateRequest,
};