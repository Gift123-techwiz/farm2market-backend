const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth.middleware");

const logisticsController = require("../controllers/logistics.controller");

router.post(
    "/",
    auth,
    logisticsController.createLogisticsProfile
);

router.get(
    "/",
    logisticsController.getAllLogisticsProfiles
);

router.get(
    "/:id",
    logisticsController.getLogisticsProfile
);

router.patch(
    "/",
    auth,
    logisticsController.updateLogisticsProfile
);

module.exports = router;