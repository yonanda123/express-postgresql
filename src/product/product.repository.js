const prisma = require("../db");

const findProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

const findProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  return product;
};

const insertProduct = async (newProduct) => {
  const product = await prisma.product.create({
    data: {
      ProductName: newProduct.ProductName,
      price: newProduct.price,
      description: newProduct.description,
      image: newProduct.image,
    },
  });

  return product;
};

const deleteProduct = async (id) => {
  await prisma.product.delete({
    where: {
      id,
    },
  });
};

const updateProduct = async (id, productData) => {
  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      ProductName: productData.ProductName,
      price: productData.price,
      description: productData.description,
      image: productData.image,
    },
  });

  return product;
};

module.exports = {
  findProducts,
  findProductById,
  insertProduct,
  deleteProduct,
  updateProduct,
};
