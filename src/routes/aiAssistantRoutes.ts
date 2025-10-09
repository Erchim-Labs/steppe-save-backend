import express from "express";
import { userController } from "../controllers/userController";
import { aiAssistantController } from "../controllers/aiAssistantController";

const aiAssisantRoutes = express.Router();

aiAssisantRoutes.post("/chat", aiAssistantController.treeyAssistant);
// userRoutes.post("/auth/login", userController.login);
// userRoutes.post("/auth/register", userController.create);

export { aiAssisantRoutes };
