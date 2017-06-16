import express from "express";
import userExistsController from "../controllers/UserExistsController";
const router = express.Router();

router.post("/api/usernames", userExistsController);

export default router;
