import blogModel from "../models/blogModel.js";
import slugify from "slugify";

export const createBlogController = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .send({ message: "Title and Content are required" });
    }
    const existingBlog = await blogModel.findOne({ title });
    if (existingBlog) {
      return res.status(200).send({
        success: false,
        message: "Blog Already Exists",
      });
    }
    const blog = await new blogModel({
      title,
      content,
      slug: slugify(title),
    }).save();
    res.status(201).send({
      success: true,
      message: "New Blog created successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating Blog",
    });
  }
};

export const getBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    res.status(200).send({
      success: true,
      blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching blogs",
      error,
    });
  }
};

export const updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { title, content, slug: slugify(title) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating blog",
      error,
    });
  }
};

export const deleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    await blogModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting blog",
      error,
    });
  }
};

export const getspecificBlogController = async (req, res) => {
  try {
    const blog = await blogModel.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Single Blog Fetched",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching blog",
      error,
    });
  }
};

