const prisma = require("../db");
const { findProducts, findProductById, insertProduct, deleteProduct, updateProduct} = require("./product.repository");

const getAllProducts = async () => {
  const products = await findProducts();
  return products;
};

const getProductById = async (id) => {
  if (typeof id !== "number") {
    throw new Error("id must be a number");
  }

  const product = await findProductById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

const createProduct = async (newProduct) => {
  const product = await insertProduct(newProduct);

  return product;
};

const deleteById = async (id) => {
  await getProductById(id);

  await deleteProduct(id);
};

const editProductByID = async (id, productData) => {
  await getProductById(id);
  const product = await updateProduct(id, productData);
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteById,
  editProductByID,
};
