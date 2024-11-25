import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js'; 
import { blogModel } from '../models/blogModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';


const getLatestBlogs = asyncHandler(async (req: Request, res: Response) => {
  try {
    const latestBlogs = await blogModel
      .find({})
      .sort({ createdAt: -1 }) 
      .limit(3); // Limit to the latest 3 stories

    if (latestBlogs.length === 0) {
      
      return res
        .status(404)
        .json(new ApiError(404, 'No stories found'));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, latestBlogs, 'Latest stories fetched successfully'));
  } catch (error) {
    console.error('Error fetching latest stories:', error);
    return res
      .status(500)
      .json(new ApiError(500, 'Internal server error while fetching stories'));
  }
});

const getBlogs = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { page = 1, limit = 10 } = req.query;
  
      const currentPage = parseInt(page as string, 10);
      const blogsPerPage = parseInt(limit as string, 10);
  
      const blogs = await blogModel.find()
        .sort({ createdAt: -1 }) // Latest blogs first
        .skip((currentPage - 1) * blogsPerPage)
        .limit(blogsPerPage);
  
      const totalBlogs = await blogModel.countDocuments();
  
      if (blogs.length === 0) {
        return res
          .status(404)
          .json(new ApiError(404, "No blogs found"));
      }
  
      return res
        .status(200)
        .json(new ApiResponse(200, {
          blogs,
          currentPage,
          totalPages: Math.ceil(totalBlogs / blogsPerPage),
        }, "Blogs fetched successfully"));
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return res
        .status(500)
        .json(new ApiError(500, "Internal server error while fetching blogs"));
    }
  });

  const getDetailedBlog = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      // Validate the ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json(new ApiError(400, "Invalid Blog ID")); 
      }
  
      // Fetch the blog
      const blog = await blogModel
        .findById(id)
        .populate("writtenBy", "name email -_id") // Assuming "Admins" has name & email fields
        .exec();
  
      if (!blog) {
        return res.status(404).json(new ApiError(404, "Blog not found"))
      }
  
      // Respond with blog details
      return res.status(200).json(new ApiResponse(200, { blog }, "Blog fetched successfully"));
    } catch (error) {
      console.error(error);
      return res.status(500).json(new ApiError(500, "An error occurred while fetching the blog"));
    }
  });

export { getLatestBlogs, getBlogs, getDetailedBlog };
