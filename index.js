const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const cors = require("cors");

//ROUTES IMPORT
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");

//CONNECTION TO DATABASE
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
});

//MIDDLEWARES
app.use(cors());
app.use(express.json());

//ROUTES
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

//STATIC FILES TO SERVE HEROKU
app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

//BACKEND SERVER LISTENER
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
