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

// Get all blogs
router.get("/get-blogs", getBlogsController);

// Update blog
router.put("/:id", updateBlogController);

// Delete blog
router.delete("/:id", deleteBlogController);

export default router;
