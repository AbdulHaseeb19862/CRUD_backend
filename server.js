import express from "express";
import cors from "cors";
import "dotenv/config";

import sequelize from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Simple CRUD API is running 🚀");
});

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connected successfully (Sequelize)");

    await sequelize.sync();
    console.log("✅ Models synced with database");

    // Server Start
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to database:", error.message);
  }
};

startServer();
