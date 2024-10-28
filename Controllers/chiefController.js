
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createChief = async (req, res) => {
    const { name, email, password, phoneNumber, IDCard, imageUrl } = req.body;

    // Validate the input
    if (!name || !email || !password || !phoneNumber || !IDCard) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const newChief = await prisma.chief.create({
            data: {
                name,
                email,
                password, // Consider hashing the password for security
                phoneNumber,
                IDCard,
                imageUrl,
            },
        });
        res.status(201).json(newChief);
    } catch (error) {
        console.error("Error creating chief:", error);
        res.status(500).json({ error: "Failed to create chief" });
    }
};
