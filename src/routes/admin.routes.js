const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

const adminController = require("../controllers/admin.controller");

router.patch("/refunds/:id", auth, role("admin"), adminController.approveRefund);

router.get("/users", auth, role("admin"), adminController.getUsers);

router.patch("/users/:id/status", auth, role("admin"), adminController.updateUserStatus);

router.get("/dashboard", auth, role("admin"), adminController.getDashboard);

module.exports = router;