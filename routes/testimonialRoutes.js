import express from "express";
import {
  createTestimonial,
  getAllTestimonials,
} from "../controllers/testimonialController.js";

const router = express.Router();

// Route to create a new testimonial
router.post("/create", createTestimonial);

// Route to get all testimonials
router.get("/get-all", getAllTestimonials);

export default router;
