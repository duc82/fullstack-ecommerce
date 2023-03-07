const sequelize = require("./configs/db.config");
require("./models/product.model");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const startServer = async (app) => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database is connected.");
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}!`));
  } catch (error) {
    console.error("Cannot connect to server:", error);
    process.exit(1);
  }
};

module.exports = startServer;
