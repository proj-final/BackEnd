const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const deleteClient = async (req, res) => {
    const { id } = req.params;
  
    try {
      const client = await prisma.client.delete({
        where: { id: parseInt(id) },
        include: {
          orders: true,  
          dishRatings: true,  
          dishfavorites: true  
        },
      });
  
     
      await prisma.order.deleteMany({
        where: { clientId: parseInt(id) },
      });
  
      res.status(200).json({
        message: "Client and related orders deleted successfully",
        client
      });
    } catch (error) {
      console.error("Error deleting client:", error);
      res.status(500).json({ error: "An error occurred while deleting the client" });
    }
  };
  module.exports = { deleteClient };
  