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
const getClientOrders = async (req, res) => {
  const { clientId } = req.params; // Get clientId from route parameters
  try {
    const orders = await prisma.order.findMany({
      where: { clientId: Number(clientId) }, // Filter orders by clientId
      include: {
        dish: true,        // Include dish details for each order
        deliveryBoy: true, // Optionally include delivery person details
      },
    });
    
    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this client' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Error fetching orders', details: error.message });
  }
};


const deleteOrderById = async (req, res) => {
  try {
    const { id } = req.params; // Extract order ID from request parameters
    const order = await prisma.order.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: 'Order deleted successfully', data: order });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
};




  module.exports = { getClientOrders , reserveOrder,deleteOrderById};