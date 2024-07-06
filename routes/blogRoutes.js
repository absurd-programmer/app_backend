import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  createBlogController,
  deleteBlogController,
  getBlogsController,
  getspecificBlogController,
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

// Get single blog
router.get("/get-blogs/:id", getspecificBlogController);

export default router;
