
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const deleteChief = async (req, res) => {
  const { id } = req.params;

  try {
    
    const chief = await prisma.chief.delete({
      where: { id: parseInt(id) }, 
    });
    res.status(200).json({ message: 'Chief deleted successfully', chief });
  } catch (error) {
    console.error('Error deleting chief:', error);
    res.status(500).json({ error: 'Failed to delete chief' });
  }
};

module.exports = {
  deleteChief,
};
