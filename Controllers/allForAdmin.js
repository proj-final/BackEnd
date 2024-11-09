const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fetch all Orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        client: true,          // Include the Client details for each order
        dish: true,            // Include the Dish details for each order
        deliveryBoy: true,     // Include the Delivery Boy assigned to each order
        ingDishes: {
          include: {
            ingredient: true,  // Include details of each ingredient in the order
          }
        }
      }
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: error.message || "Error fetching orders" });
  }
};

// Fetch all Delivery Boys
const getAllDeliveryBoys = async (req, res) => {
  try {
    const deliveryBoys = await prisma.deliveryBoy.findMany({
      include: {
        orders: {
          include: {
            client: true,
            dish: true
          }
        }
      }
    });
    res.status(200).json(deliveryBoys);
  } catch (error) {
    console.error("Error fetching delivery boys with orders:", error);
    res.status(500).json({ error: error.message || "Error fetching delivery boys with orders" });
  }
};

// Fetch all Dishes
const getAllDishes = async (req, res) => {
  try {
    const dishes = await prisma.dish.findMany({
      include: {
        Chiefs: true,
        ratings: true,
        Orders: true,
        ingDishes: {
          include: {
            ingredient: true
          }
        }
      }
    });
    res.status(200).json(dishes);
  } catch (error) {
    console.error("Error fetching dishes:", error);
    res.status(500).json({ error: error.message || "Error fetching dishes" });
  }
};

// Fetch all Clients with orders and favorite dishes
const getAllClients = async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      include: {
        orders: {
          include: {
            dish: true,
            deliveryBoy: true
          }
        },
        dishfavorites: true
      }
    });
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching clients with orders and favorite dishes:", error);
    res.status(500).json({ error: error.message || "Error fetching clients with orders and favorite dishes" });
  }
};

// Fetch all Chefs
const getAllChefs = async (req, res) => {
  try {
    const chefs = await prisma.chief.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
        dishes: {
          select: {
            id: true,
            title: true,
            category: true,
            price: true,
            duration: true,
            imageUrl: true
          }
        }
      }
    });
    res.status(200).json(chefs);
  } catch (error) {
    console.error("Error fetching chefs:", error);
    res.status(500).json({ error: error.message || "Error fetching chefs" });
  }
};

module.exports = {
  getAllOrders,
  getAllDeliveryBoys,
  getAllDishes,
  getAllClients,
  getAllChefs
};
