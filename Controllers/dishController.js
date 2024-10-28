const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllDishes = async (req, res) => {
  try {
    const dishes = await prisma.dish.findMany();
    res.status(200).json({
      success: true,
      data: dishes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dishes",
      error: error.message,
    });
  }
};
