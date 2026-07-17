const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const walletController = require("../controllers/wallet.controller");

router.get("/", auth, walletController.getWallet);

router.post("/fund", auth, walletController.fundWallet);

router.post("/withdraw", auth, walletController.withdraw);

router.get("/transactions", auth, walletController.getTransactions);

module.exports = router;