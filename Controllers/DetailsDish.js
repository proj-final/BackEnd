// controllers/dishController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function showDishes(req, res) {
  try {
    const dishes = await prisma.dish.findMany({
      include: {
        ingDishes: {
          include: {
            ingredient: true,
          },
        },
        Chiefs: true,
      },
    });
    res.render('dishes', { dishes });
  } catch (error) {
    console.error('Error fetching dishes:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = { showDishes };
