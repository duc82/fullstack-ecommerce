const { Op, Sequelize } = require("sequelize");
const asyncWrapper = require("../middlewares/asyncWrapper.middleware");
const CustomError = require("../utils/error.util");
const Product = require("../models/product.model");
const Image = require("../models/image.model");
const Rating = require("../models/rating.model");

const productController = {
  getProduct: asyncWrapper(async (req, res) => {
    const { category } = req.params;
    const { page, limit, sort, cost, brand, avgRating, name } = req.query;
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
        "category",
        "stock",
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
      ],
      order: [["id", "asc"]],
      limit: 10,
      offset: 0,
      distinct: true,
    };

    if (category !== "Tất cả sản phẩm") {
      obj.where = { ...obj.where, category };
    } else if (category === "Các loại nồi") {
      const categories = category.split(" ");
      obj.where = {
        ...obj.where,
        category: { [Op.iLike]: `%${categories[2]}%` },
      };
    }

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

    if (brand) {
      obj.where.brand = brand;
    }

    if (cost) {
      const newCost = cost.split("");
      const costBetween = newCost.map((c) => {
        return {
          cost: {
            [Op.between]: JSON.parse(c),
          },
        };
      });
      obj.where = {
        ...obj.where,
        [Op.or]: costBetween,
      };
    }

    if (avgRating) {
      obj.where.avgRating = {
        [Op.gte]: Number(avgRating),
      };
    }

    if (name) {
      obj.where = Sequelize.where(
        Sequelize.fn("unaccent", Sequelize.col("Product.name")),
        Op.iLike,
        Sequelize.fn("unaccent", `${name}%`)
      );
    }

    console.log(obj);

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
      attributes: {
        include: [
          [
            Sequelize.literal(
              `(SELECT COUNT(id) FROM "Ratings" WHERE "Ratings"."productId" = "Product"."id")`
            ),
            "ratingCount",
          ],
        ],
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
      category,
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
        price &&
        category
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
      category,
    });

    const image = images.map((img) => {
      return { src: img, alt: product.name, productId: product.id };
    });

    const newImage = await Image.bulkCreate(image);

    res.status(200).json({
      ...product.get({ plain: true }),
      images: newImage.map((img) => img.get({ plain: true })),
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
