const notificationService = require("./notification.service");
const emailService = require("./email.service");
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

    const order = await orderRepository.create({
    ...orderData,
    buyer,
    listing,
    });

    await notificationService.createNotification(
        buyer.user,
        "Order Placed",
        `Your order for ${listing.produce_name} has been placed successfully.`
    );

    await notificationService.createNotification(
        listing.farmer.user,
        "New Order",
        `You have received a new order for ${listing.produce_name}.`
    );

    await emailService.sendOrderPlacedEmail(
        buyer.user.email,
        listing.produce_name
    );

    await emailService.sendNewOrderReceivedEmail(
        listing.farmer.user.email,
        listing.produce_name
    );

    return order;
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

    const updatedOrder = await orderRepository.update(id, {
        status,
    });

    switch (status) {

        case "confirmed":

            await notificationService.createNotification(
                order.buyer.user,
                "Order Confirmed",
                "Your order has been accepted by the farmer."
            );

            await notificationService.createNotification(
                order.listing.farmer.user,
                "Order Accepted",
                "You accepted a buyer's order."
            );

            await emailService.sendOrderAcceptedEmail(
                order.buyer.user.email
            );

            break;

        case "cancelled":

            await notificationService.createNotification(
                order.buyer.user,
                "Order Cancelled",
                "Your order has been cancelled."
            );

            await notificationService.createNotification(
                order.listing.farmer.user,
                "Order Cancelled",
                "You cancelled a buyer's order."
            );

            await emailService.sendOrderCancelledEmail(
                order.buyer.user.email
            );

            break;

        case "completed":

            await notificationService.createNotification(
                order.buyer.user,
                "Order Completed",
                "Your order has been completed successfully."
            );

            await notificationService.createNotification(
                order.listing.farmer.user,
                "Order Completed",
                "You completed a buyer's order."
            );

            await emailService.sendOrderCompletedEmail(
                order.buyer.user.email
            );

            break;
    }
    return updatedOrder;
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
