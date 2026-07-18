const coldRoomRepository = require('../repositories/coldRoom.repository');

class ColdRoomService {
  async createColdRoom(data) {
    return await coldRoomRepository.create(data);
  }

  async getAllColdRooms(filters) {
    return await coldRoomRepository.findAll(filters);
  }

  async getColdRoomById(id) {
    const coldRoom = await coldRoomRepository.findById(id);
    if (!coldRoom) {
      throw new Error('Cold room not found');
    }
    return coldRoom;
  }

  async updateColdRoom(id, data, farmerId) {
    const coldRoom = await coldRoomRepository.findById(id);
    if (!coldRoom) {
      throw new Error('Cold room not found');
    }
    if (coldRoom.farmer_id !== farmerId) {
      throw new Error('Not authorized');
    }
    return await coldRoomRepository.update(id, data);
  }
}

module.exports = new ColdRoomService();