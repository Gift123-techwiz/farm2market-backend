const orderRepository = require("../repositories/order.repository");
const AppDataSource = require("../config/data-source");

class OrderService {
  async createOrder(orderData) {
    const buyerRepository = AppDataSource.getRepository("BuyerProfile");
    const listingRepository = AppDataSource.getRepository("ProduceListing");

    const buyer = await buyerRepository.findOne({
      where: {
        id: orderData.buyer.id,
      },
    });

    if (!buyer) {
      throw new Error("Buyer not found.");
    }

    const listing = await listingRepository.findOne({
      where: {
        id: orderData.listing.id,
      },
    });

    if (!listing) {
      throw new Error("Produce listing not found.");
    }

    if (listing.status !== "available") {
      throw new Error("This produce is no longer available.");
    }

    return await orderRepository.create({
      ...orderData,
      buyer,
      listing,
    });
  }

  async getAllOrders() {
    return await orderRepository.findAll();
  }

  async getOrderById(id) {
    const order = await orderRepository.findById(id);

    if (!order) {
      throw new Error("Order not found.");
    }

    return order;
  }

  async getBuyerOrders(buyerId) {
    return await orderRepository.findByBuyer(buyerId);
  }

  async getFarmerOrders(farmerId) {
    return await orderRepository.findByFarmer(farmerId);
  }

  async updateOrderStatus(id, status) {
    const order = await orderRepository.findById(id);

    if (!order) {
      throw new Error("Order not found.");
    }

    return await orderRepository.update(id, {
      status,
    });
  }

  async deleteOrder(id) {
    const order = await orderRepository.findById(id);

    if (!order) {
      throw new Error("Order not found.");
    }

    await orderRepository.delete(id);

    return {
      success: true,
      message: "Order deleted successfully.",
    };
  }
}

module.exports = new OrderService();
