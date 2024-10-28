const express = require("express");
const cors = require("cors");
const dishRoutes = require("./Routes/dishRoutes");
const bodyParser = require("body-parser");
const categoryRouter = require("./Routes/categoryDishRoutes.js");
const creatdishRouter = require("./Routes/creatDishRoute.js");
const chiefRouter = require("./Routes/chiefRoutes.js");
const authroutes = require("./Routes/authroutes.js");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extends: true }));
app.use(express.json());

app.use("/api/users", authroutes);
app.use("/api/dish", dishRoutes);
app.use("/api/category", categoryRouter);
app.use("/api/create", creatdishRouter);
app.use("/api/chief", chiefRouter);

const PORT = 5000;
app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server is running on port ${PORT}`);
});
