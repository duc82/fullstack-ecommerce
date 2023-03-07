const { Op, Sequelize } = require("sequelize");
const asyncWrapper = require("../middlewares/asyncWrapper.middleware");
const CustomError = require("../utils/error.util");
const Product = require("../models/product.model");
const Image = require("../models/image.model");
const Category = require("../models/category.model");
const Rating = require("../models/rating.model");

const productController = {
  getProduct: asyncWrapper(async (req, res) => {
    const { category } = req.params;
    const { page, limit, sort, cost, brand, avgRating } = req.query;

    const obj = {
      where: {},
      attributes: [
        "id",
        "name",
        "slug",
        "avgRating",
        "price",
        "cost",
        "discount",
        "bonus",
        "status",
        "desc",
        "sold",
        [
          Sequelize.literal(
            `(SELECT title FROM "Categories" WHERE "Categories"."title" = '${category}' AND "Categories"."productId" = "Product"."id")`
          ),
          "category",
        ],

        [
          Sequelize.literal(
            `(SELECT COUNT(id) FROM "Ratings" WHERE "Ratings"."productId" = "Product"."id")`
          ),
          "ratingCount",
        ],
      ],
      include: [
        {
          model: Image,
          as: "images",
        },
        {
          model: Rating,
          as: "ratings",
          attributes: [],
        },
        {
          model: Category,
          as: "categories",
          attributes: [],
        },
      ],
      order: [["id", "asc"]],
      limit: 10,
      offset: 0,
      distinct: true,
    };

    if (limit) {
      obj.limit = Number(limit);
    }
    if (page) {
      obj.offset = Number(page - 1) * obj.limit;
    }

    if (sort) {
      const newSort = sort.split("-");
      obj.order = [[newSort[0], newSort[1]]];
    }

    if (cost) {
      obj.where.cost = {
        [Op.between]: JSON.parse(cost),
      };
    }

    if (brand) {
      obj.where.brand = brand;
    }

    if (avgRating) {
      obj.where.avgRating = {
        [Op.gte]: Number(avgRating),
      };
    }

    const { count: countProduct, rows } = await Product.findAndCountAll(obj);

    if (rows.length === 0) {
      throw new CustomError({
        message: "Không tìm thấy sản phẩm",
        status: 404,
      });
    }

    res.status(200).json({
      products: rows,
      page: Number(page) || 1,
      limit: obj.limit,
      countProduct,
      countPage: Math.ceil(countProduct / obj.limit),
    });
  }),

  getProductBySlug: asyncWrapper(async (req, res) => {
    const { slug } = req.params;

    const product = await Product.findOne({
      where: {
        slug,
      },
      include: {
        all: true,
      },
    });

    if (!product) {
      throw new CustomError({
        message: "Không tìm thấy sản phẩm",
        status: 404,
      });
    }

    res.status(200).json({
      ...product.get({ plain: true }),
    });
  }),

  createProduct: asyncWrapper(async (req, res) => {
    const {
      name,
      brand,
      model,
      desc,
      bonus,
      currency,
      stock,
      discount,
      price,
      thumnail,
      images,
      categories,
    } = req.body;

    if (
      !(
        name &&
        brand &&
        model &&
        desc &&
        currency &&
        stock &&
        discount &&
        price
      )
    ) {
      throw new CustomError({
        status: 400,
        message: "Vui lòng nhập thông tin sản phẩm",
      });
    }

    const product = await Product.create({
      name,
      brand,
      model,
      desc,
      bonus,
      currency,
      stock,
      discount,
      price,
      thumnail,
    });

    const image = images.map((img) => {
      return { src: img, alt: product.name, productId: product.id };
    });

    const category = categories.map((category) => {
      return { category: category, productId: product.id };
    });

    const newImage = await Image.bulkCreate(image);

    const newCategory = await Category.bulkCreate(category);

    res.status(200).json({
      ...product.get({ plain: true }),
      images: newImage.map((img) => img.get({ plain: true })),
      categories: newCategory.map((category) => category.get({ plain: true })),
    });
  }),

  updateProduct: asyncWrapper(async (req, res) => {
    const { id, data } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      throw new CustomError({
        message: "Id sản phẩm không hợp lệ",
        status: 404,
      });
    }

    await Product.update(data, {
      where: {
        id,
      },
      individualHooks: true,
    });

    res.status(200).json({
      message: "Cap nhat san pham thanh cong!",
    });
  }),

  deleteProduct: asyncWrapper(async (req, res) => {
    const { id } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      throw new CustomError({
        message: "Id sản phẩm không hợp lệ",
        status: 404,
      });
    }

    await Image.destroy({
      where: {
        productId: id,
      },
    });

    await Tag.destroy({
      where: {
        productId: id,
      },
    });

    await Rating.destroy({
      where: {
        productId: id,
      },
    });

    await Product.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: "Xóa sản phẩm thành công!",
    });
  }),
};

module.exports = productController;
