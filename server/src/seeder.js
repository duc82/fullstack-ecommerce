const products = require("./datas/products.data");
const Image = require("./models/image.model");
const Product = require("./models/product.model");
const Category = require("./models/category.model");

const createProduct = async (products) => {
  try {
    const {
      name,
      bonus,
      brand,
      model,
      stock,
      discount,
      price,
      images,
      currency,
      categories,
      desc,
      thumnail,
    } = products;
    const newProduct = await Product.create({
      name,
      bonus,
      brand,
      model,
      stock,
      discount,
      price,
      currency,
      desc,
      thumnail,
    });

    const image = images.map((image) => {
      return { src: image, alt: newProduct.name, productId: newProduct.id };
    });

    const category = categories.map((category) => {
      return { title: category, productId: newProduct.id };
    });

    const newImage = await Image.bulkCreate(image);

    const newCategory = await Category.bulkCreate(category);

    console.log({
      ...newProduct.get({ plain: true }),
      images: newImage.map((i) => i.get({ plain: true })),
      categories: newCategory.map((c) => c.get({ plain: true })),
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

const main = () => {
  products.forEach((product) => createProduct(product));
};

main();
