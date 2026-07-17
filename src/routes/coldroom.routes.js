const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { verifiedFarmerOnly } = require('../middleware/verifiedFarmer');
const {
  createColdRoom,
  getAllColdRooms,
  getColdRoom,
  updateColdRoom,
} = require('../controllers/coldRoomController');

router.post('/', protect, verifiedFarmerOnly, createColdRoom);
router.get('/', getAllColdRooms);
router.get('/:id', getColdRoom);
router.patch('/:id', protect, verifiedFarmerOnly, updateColdRoom);

module.exports = router;