const express = require("express");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET


app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

const productController = require('./product/product.controller')

app.use('/products', productController);

const userController = require('./user/user.controller');

app.use('/', userController);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
