
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


const categoryRouter = require("./Routes/categoryDishRoutes.js");
const creatdishRouter = require("./Routes/creatDishRoute.js");
const getAllChefsRouter = require("./Routes/getallchiefRoute.js");
const authroutes = require("./Routes/authroutes.js");
const Orderouter = require("./Routes/orderRoute.js");
const allOrdersrouter = require("./Routes/deliveryOrderRouter.js");
const detailsrouter = require("./Routes/DetailsDishRoute.js");
const routerAdmin = require("./Routes/adminRoutes.js");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


app.use("/api/users", authroutes);
app.use("/api", detailsrouter);
app.use("/api/category", categoryRouter);
app.use("/api/create", creatdishRouter);
app.use("/api", getAllChefsRouter);
app.use("/api/orders", Orderouter);
app.use("/api", allOrdersrouter);
app.use("/api", routerAdmin);

const PORT = 5000;

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server is running on port ${PORT}`);
});
