const express = require('express');
const router = express.Router();

// const { protect } = require('../middleware/auth');
// const { verifiedFarmerOnly } = require('../middleware/verifiedFarmer');
const {
  createColdRoom,
  getAllColdRooms,
  getColdRoom,
  updateColdRoom,
} = require('../controllers/coldroom.controller');

router.post('/', createColdRoom);
router.get('/', getAllColdRooms);
router.get('/:id', getColdRoom);
router.patch('/:id',  updateColdRoom);

module.exports = router;