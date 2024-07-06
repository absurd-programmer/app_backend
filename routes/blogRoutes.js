import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  createBlogController,
  deleteBlogController,
  getBlogsController,
  updateBlogController,
} from "./../controllers/blogController.js";

const router = express.Router();

// Create blog
router.post("/create-blog", requireSignIn, isAdmin, createBlogController);
router.get("/", getBlogsController);
router.put("/:id", updateBlogController);
router.delete("/:id", deleteBlogController);
// Other routes for update, get, delete can be added similarly

export default router;
