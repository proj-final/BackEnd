const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Helper function to validate email format
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Client Registration with validation
const registerClient = async (req, res) => {
  const { name, email, password, confirmPassword, phoneNumber, address, imageUrl } = req.body;

  // Validate required fields
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Validate password length
  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters long" });
  }

  // Validate password match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newClient = await prisma.client.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        address,
        imageUrl,
      },
    });
    res.status(201).json(newClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating client", details: error.message });
  }
};

// Chef Registration with validation
const registerChef = async (req, res) => {
  const { name, email, password, confirmPassword, phoneNumber, imageUrl, IDCard } = req.body;

  // Validate required fields
  if (!name || !email || !password || !confirmPassword || !IDCard) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Validate password length
  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters long" });
  }

  // Validate password match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newChef = await prisma.chief.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        imageUrl,
        IDCard,  // Ensure this is an array of strings
      },
    });
    res.status(201).json(newChef);
  } catch (error) {
    console.error("Error creating chef:", error);
    res.status(500).json({ error: "Error creating chef", details: error.message });
  }
};

// DeliveryBoy Registration with validation
const registerDeliveryBoy = async (req, res) => {
  const { name, email, password, confirmPassword, phone, imageUrl, cardIds } = req.body;

  // Validate required fields
  if (!name || !email || !password || !confirmPassword || !cardIds) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Validate password length
  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters long" });
  }

  // Validate password match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newDeliveryBoy = await prisma.deliveryBoy.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        imageUrl,
        cardIds,  // Ensure this is in a proper format (JSON array)
      },
    });
    res.status(201).json(newDeliveryBoy);
  } catch (error) {
    console.error("Error creating delivery boy:", error.message);  // Log the specific error message
    res.status(500).json({ error: "Error creating delivery boy", details: error.message });
  }
};

// Login function for Client, Chef, and Delivery Boy
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for Client
    let user = await prisma.client.findUnique({ where: { email } });
    let userType = "client";

    if (!user) {
      // Check for Chef
      user = await prisma.chief.findUnique({ where: { email } });
      userType = "chief";
    }

    if (!user) {
      // Check for DeliveryBoy
      user = await prisma.deliveryBoy.findUnique({ where: { email } });
      userType = "deliveryBoy";
    }

    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id, userType }, process.env.JWTSelf, {
      expiresIn: "10h",
    });
    
    res.json({
      token,
      userType,
      user: {
        name: user.name,
        imageUrl: user.imageUrl,
        email: user.email,
        phone: user.phone || user.phoneNumber, // Adjust for Delivery Boy and Chef
        id: user.id,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in", details: error.message });
  }
};

module.exports = {
  registerClient,
  registerChef,
  registerDeliveryBoy,
  login,
};
