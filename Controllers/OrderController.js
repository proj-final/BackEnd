const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Reserve an Order (Create Order with "PENDING" status)
const reserveOrder = async (req, res) => {
  try {
    const { clientId, dishId, quantity } = req.body;

    const dish = await prisma.dish.findUnique({ where: { id: dishId } });
    if (!dish) {
      return res.status(404).json({ error: 'Dish not found' });
    }

    const totalAmount = dish.price * quantity;

    const newOrder = await prisma.order.create({
      data: {
        clientId,
        dishId,
        quantity,
        totalAmount,
        status: 'PENDING', // Initial reservation status
      },
    });

    res.status(201).json({ message: 'Order reserved successfully', data: newOrder });
  } catch (error) {
    console.error('Error reserving order:', error);
    res.status(500).json({ error: 'Failed to reserve order', details: error.message });
  }
};
const getOrders = async (req, res) => {
    try {
      const orders = await prisma.order.findMany({
        include: {
          dish: true,        // Include dish details for each order
          client: true,      // Optionally include client details
          deliveryBoy: true, // Optionally include delivery person details
        },
      });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: "Error fetching orders" });
    }
  };


  const deleteOrderById = async (req, res) => {
    try {
      const { id } = req.params;
      await Order.findByIdAndDelete(id);
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting order", error });
    }
  };



  module.exports = { getOrders , reserveOrder,deleteOrderById};