const express = require("express");

const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteById,
  editProductByID,
} = require("./product.service");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.send(products);
});

router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await getProductById(productId);

    res.send(product);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProducts = req.body;
    const product = await createProduct(newProducts);

    res.send({
      data: product,
      message: "Product created successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    await deleteById(productId);
    res.send("Product deleted successfully");
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
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
    const product = await editProductByID(productId, productData);
    res.send({
      data: product,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const productData = req.body;

    const product = await editProductByID(productId, productData);
    res.send({
      data: product,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = router;
