const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const dotenv = require("dotenv");

dotenv.config();
const app = express();   // ⚡ phải khai báo app trước

// Middleware
app.use(bodyParser.json()); // để đọc JSON từ Postman
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Routes
const supplierRoutes = require("./routes/supplierRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/suppliers", supplierRoutes);
app.use("/products", productRoutes);

// Trang chủ
app.get("/", (req, res) => {
  res.render("index");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
