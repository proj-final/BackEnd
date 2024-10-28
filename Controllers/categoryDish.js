

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getDishesByCategory = async (req, res) => {
  const { category } = req.params

  try {
    const dishes = await prisma.dish.findMany({
      where: {
        category: category, 
      },
    });

    res.json(dishes)
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getDishesByCategory,
};
