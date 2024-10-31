// chefController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


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
        dishes: true, 
      },
    });

    res.status(200).json(chefs);
  } catch (error) {
    console.error("Error fetching chefs:", error);
    res.status(500).json({ error: "Error fetching chefs" });
  }
};

module.exports = {
  getAllChefs,
  
}