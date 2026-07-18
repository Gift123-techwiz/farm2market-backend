const OrderService = require("../services/order.service");

exports.createOrder = async (req, res) => {
  try {
    const order = await OrderService.createOrder(req.body);

    res.status(201).json({
      success: true,
      message: "Order created successfully.",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await OrderService.getAllOrders();

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await OrderService.getOrderById(req.params.id);

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getBuyerOrders = async (req, res) => {
  try {
    const orders = await OrderService.getBuyerOrders(req.params.buyerId);

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getFarmerOrders = async (req, res) => {
  try {
    const orders = await OrderService.getFarmerOrders(req.params.farmerId);

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await OrderService.updateOrderStatus(
      req.params.id,
      req.body.status,
    );

    res.json({
      success: true,
      message: "Order status updated successfully.",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const result = await OrderService.deleteOrder(req.params.id);

    res.json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
