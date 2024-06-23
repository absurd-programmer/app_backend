import Testimonial from "../models/testimonialModel.js";

// Create a new testimonial
export const createTestimonial = async (req, res) => {
  try {
    const { name, message } = req.body;
    const newTestimonial = new Testimonial({ name, message });
    await newTestimonial.save();
    res.status(201).json({ success: true, testimonial: newTestimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all testimonials
export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json({ success: true, testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
