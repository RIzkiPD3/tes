import express, { Application } from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
const swaggerSpec = require("../src/config/swagger");

import authRoutes from "../src/routes/authRoutes";
import userRoutes from "../src/routes/userRoutes";
import categoryRoutes from "../src/routes/categoryRoutes";
import taskRoutes from "../src/routes/taskRoutes";
import reminderRoutes from "../src/routes/reminderRoutes";

const app: Application = express();
app.use(bodyParser.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Auth routes (public)
app.use("/api/auth", authRoutes);

// Protected routes
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/reminders", reminderRoutes);

const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
export default app;
