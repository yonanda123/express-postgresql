const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.send(products);
});

app.get("/products/:id", async (req, res) => {
    const productId = req.params.id;
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(productId),
      },
    });

    if (!product) {
      return res.status(404).send("Product Not Found");
    }

    res.send(product);
})

app.post("/products", async (req, res) => {
  const newProducts = req.body;
  const product = await prisma.product.create({
    data: {
      name: newProducts.name,
      price: newProducts.price,
      description: newProducts.description,
      image: newProducts.image,
    },
  });
  res.send({
    data: product,
    message: "Product created successfully",
  });
});

app.delete("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await prisma.product.delete({
    where: {
      id: parseInt(productId),
    },
  });
  res.send("Product deleted successfully");
});

app.put("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  if (
    !(
      productData.name &&
      productData.price &&
      productData.description &&
      productData.image
    )
  ) {
    return res.status(400).send({
      message: "All fields are required",
    });
  }

  const product = await prisma.product.update({
    where: {
      id: parseInt(productId),
    },
    data: {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      image: productData.image,
    },
  });
  res.send({
    data: product,
    message: "Product updated successfully",
  });
});

app.patch('/products/:id', async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;

    const product = await prisma.product.update({
        where: {
          id: parseInt(productId),
        },
        data: {
          name: productData.name,
          price: productData.price,
          description: productData.description,
          image: productData.image,
        },
      });
      res.send({
        data: product,
        message: "Product updated successfully",
      });
})

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
