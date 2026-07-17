const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth.middleware");

const paymentController = require("../controllers/payment.controller");

router.post("/initialize", auth, paymentController.initialize);

router.post("/verify", auth, paymentController.verify);

router.get("/history", auth, paymentController.history);

router.post("/refund", auth, paymentController.requestRefund);

module.exports = router;