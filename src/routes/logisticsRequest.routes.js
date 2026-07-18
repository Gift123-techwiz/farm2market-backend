const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth.middleware");

const logisticsRequestController = require("../controllers/logisticsRequest.controller");

router.post(
    "/",
    auth,
    logisticsRequestController.createRequest
);

router.get(
    "/",
    auth,
    logisticsRequestController.getAllRequests
);

router.get(
    "/:id",
    auth,
    logisticsRequestController.getRequestById
);

router.patch(
    "/:id",
    auth,
    logisticsRequestController.updateRequest
);

module.exports = router;