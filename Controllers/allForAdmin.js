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
    res.status(500).json({ error: "Error fetching orders" });
  }
};

// Fetch all Delivery Boys
const getAllDeliveryBoys = async (req, res) => {
  try {
    console.log("Fetching delivery boys...");

    const deliveryBoys = await prisma.deliveryBoy.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    if (!deliveryBoys || deliveryBoys.length === 0) {
      console.log("No delivery boys found");
      return res.status(404).json({ error: "No delivery boys found" });
    }

    res.status(200).json(deliveryBoys);
  } catch (error) {
    console.error("Error fetching delivery boys:", error);
    res.status(500).json({ error: "Error fetching delivery boys", details: error.message });
  }
};

// Fetch all Dishes
const getAllDishes = async (req, res) => {
  try {
    const dishes = await prisma.dish.findMany({
      include: {
        Chiefs: true,         // Include the Chief who created the dish
        ratings: true,        // Include ratings for the dish
        Orders: true,         // Include orders that contain this dish
        ingDishes: {
          include: {
            ingredient: true, // Include ingredients used in the dish
          }
        }
      }
    });

    res.status(200).json(dishes);
  } catch (error) {
    console.error("Error fetching dishes:", error);
    res.status(500).json({ error: "Error fetching dishes" });
  }
};

// Fetch all Clients
const getAllClients = async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        address: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
      }
    }); 
    res.status(200).json(clients); 
  } catch (error) {
    console.error("Error fetching clients:", error); // Improved error logging
    res.status(500).json({ error: 'Error fetching clients' });
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
        }, 
      },
    });

    res.status(200).json(chefs);
  } catch (error) {
    console.error("Error fetching chefs:", error);
    res.status(500).json({ error: "Error fetching chefs" });
  }
};

// Export all the functions in a single object
module.exports = {
  getAllOrders,
  getAllDeliveryBoys,
  getAllDishes,
  getAllClients,
  getAllChefs
};
