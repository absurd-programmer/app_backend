import express from "express";
import {
  createTestimonial,
  getAllTestimonials,
} from "../controllers/testimonialController.js";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

// Route to create a new testimonial
router.post("/create", requireSignIn, isAdmin, formidable(), createTestimonial);

// Route to get all testimonials
router.get(
  "/get-all",
  requireSignIn,
  isAdmin,
  formidable(),
  getAllTestimonials
);

export default router;
