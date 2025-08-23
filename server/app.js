const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoute");
const moviesRoutes = require("./routes/movieRoute");
const authenticateToken = require("./middleware/authMiddleware");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const appRouter = express.Router();

appRouter.use("/auth", authRoutes);
appRouter.use("/movies", authenticateToken, moviesRoutes);

app.use("/api", appRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
