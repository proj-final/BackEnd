const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fetchAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        client: true,
        dish: true,
        deliveryBoy: true,
        ingDishes: true,
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error retrieving all orders:", error);
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
};

module.exports = {
  fetchAllOrders,
}