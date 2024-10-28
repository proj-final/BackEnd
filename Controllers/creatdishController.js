const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createDish = async (req, res) => {
    const { title, category, description, price, imageUrl, duration, chiefId } = req.body; // Expecting chiefId

    try {
        // Validate incoming data
        if (!title || !category || !description || !price || !imageUrl || !duration || !chiefId) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newDish = await prisma.dish.create({
            data: {
                title,
                category,
                description,
                price,
                imageUrl, // This should be an array
                duration,
                Chiefs: { // Create a relation with Chief
                    connect: { id: chiefId } // Use the chiefId to connect
                }
            },
        });
        res.status(201).json(newDish);
    } catch (error) {
        console.error("Error creating dish:", error);
        res.status(500).json({ error: "Failed to create dish", details: error.message });
    }
};
