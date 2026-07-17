const coldRoomService = require('../services/coldRoomService');

exports.createColdRoom = async (req, res) => {
  try {
    const farmerId = req.user.id;
    const coldRoom = await coldRoomService.createColdRoom({ ...req.body, farmer_id: farmerId });
    res.status(201).json({ success: true, data: coldRoom });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllColdRooms = async (req, res) => {
  try {
    const coldRooms = await coldRoomService.getAllColdRooms(req.query);
    res.status(200).json({ success: true, count: coldRooms.length, data: coldRooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getColdRoom = async (req, res) => {
  try {
    const coldRoom = await coldRoomService.getColdRoomById(req.params.id);
    res.status(200).json({ success: true, data: coldRoom });
  } catch (error) {
    const status = error.message === 'Cold room not found' ? 404 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};

exports.updateColdRoom = async (req, res) => {
  try {
    const updated = await coldRoomService.updateColdRoom(req.params.id, req.body, req.user.id);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    const status = error.message === 'Cold room not found' ? 404 : error.message === 'Not authorized' ? 403 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};