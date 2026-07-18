const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth.middleware");

const notificationController = require("../controllers/notification.controller");

router.get(
    "/",
    auth,
    notificationController.getNotifications
);

router.patch(
    "/:id/read",
    auth,
    notificationController.markAsRead
);

module.exports = router;