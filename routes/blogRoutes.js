import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  createBlogController,
  getBlogsController,
} from "./../controllers/blogController.js";

const router = express.Router();

// Create blog
router.post("/create-blog", requireSignIn, isAdmin, createBlogController);
router.get("/get-blogs", getBlogsController);
// Other routes for update, get, delete can be added similarly

export default router;
