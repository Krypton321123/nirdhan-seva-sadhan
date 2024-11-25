import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { isEmpty } from "../utils/isEmpty.js";
import { Request, Response } from "express";
import { adminModel } from "../models/adminModel.js";
import { adminInterface } from "../models/adminModel.js";
import path from 'path'
import fs from 'fs'
import {  campaignModel,} from "../models/campaignModels.js";
import { RequestWithAdmin } from "../utils/RequestWithUser.js";
import { blogModel, blogSchemaInterface } from "../models/blogModel.js";
import jsonwebtoken from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'
import { galleryModel } from "../models/galleryModel.js";
import { GallerySchemaInterface } from "../models/galleryModel.js";

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


console.log("Cloudinary Config:");
console.log("CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API_KEY:", process.env.CLOUDINARY_API_KEY);
console.log("API_SECRET:", process.env.CLOUDINARY_API_SECRET);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const adminLoginController = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, password } = req.body;
    console.log('reached here')

    if (isEmpty(username) || isEmpty(password)) {
      return res
        .status(400)
        .json(new ApiError(400, "Empty username or password"));
    }

    try {
      const existingUser = await adminModel.findOne<adminInterface>({
        username: username,
      });

      if (!existingUser) {
        return res.status(409).json(new ApiError(409, "User not found"));
      }

      if (existingUser.password !== password) {
        return res.status(409).json(new ApiError(409, "Password not matched"));
      }

      const payload = {
        _id: existingUser._id,
        username: existingUser.username,
      };

      const authToken = jsonwebtoken.sign(
        payload,
        String(process.env.ADMIN_TOKEN_SECRET)
      );

      return res
        .status(200)
        .json(
          new ApiResponse(200, { existingUser, authToken }, "Admin Logged In")
        );
    } catch (err: any) {
      console.log(err);
      return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
  }
);

const adminCreateCampaignController = asyncHandler(
    async (req: RequestWithAdmin, res: Response) => {
        const admin: any = req.admin;
        const { name, goal, description } = req.body;
        const file = req.file; // Image from multer
    
        if (!name || !goal || !description) {
          return res.status(400).json(new ApiError(400, "All fields are required"));
        }
    
        if (file) {
          console.log("File received: ", file.path);
          // Check if file exists
          const imagePath = path.join(__dirname, '../../uploads', file.filename);
          console.log("Image path to upload: ", imagePath);
    
          // Check if file exists at the given path
          if (!fs.existsSync(imagePath)) {
            console.error("File not found at path:", imagePath);
            return res.status(400).json(new ApiError(400, "Image file not found"));
          }
    
          try {
            console.log("Uploading image to Cloudinary...");
            const result = await cloudinary.uploader.upload(imagePath, {
              folder: "campaign_images",
            });
    
            console.log("Image uploaded to Cloudinary:", result.secure_url);
            const imageUrl = result.secure_url;
    
            // Save campaign to DB
            const newCampaign = new campaignModel({
              name,
              goal,
              description,
              imageURL: imageUrl,
              createdBy: admin._id,
            });

            fs.unlink(imagePath, (err) => {
                if (err) {
                  console.error("Error deleting the file:", err);
                } else {
                  console.log("Local file deleted successfully");
                }
              });
    
            const savedCampaign = await newCampaign.save();
    
            return res.status(201).json(
              new ApiResponse(201, savedCampaign, "Campaign created successfully")
            );
          } catch (error: any) {
            console.error("Error uploading to Cloudinary:", error);
            return res.status(500).json(new ApiError(500, "Error uploading image", error));
          }
        } else {
          return res.status(400).json(new ApiError(400, "No file uploaded"));
        }
      }
);

const adminCreateBlogController = asyncHandler(
    async (req: RequestWithAdmin, res: Response) => {
      const admin: any = req.admin;
  
      try {
        const { blogTitle, blogContent } = req.body;
        const file = req.file; // Extracting the uploaded file
        console.log(blogTitle, blogContent, file);
  
        // Validate input
        if (isEmpty(blogTitle) || isEmpty(blogContent)) {
          return res.status(400).json(new ApiError(400, "Invalid / Empty Input"));
        }
  
        const existingBlog = await blogModel.findOne<blogSchemaInterface>({
          title: blogTitle,
        });
  
        if (existingBlog) {
          return res.status(409).json(new ApiError(409, "Blog Already Exists"));
        }
  
        let imageUrl = "";
        if (file) {
          // Construct full path to the uploaded file
          const imagePath = path.join(__dirname, "../../uploads", file.filename);
  
          try {
            // Upload image to Cloudinary
            const result = await cloudinary.uploader.upload(imagePath, {
              folder: "blog_images",
            });
            imageUrl = result.secure_url;
            console.log(imageUrl)
  
            // Delete file from server after uploading to Cloudinary
            fs.unlinkSync(imagePath);
          } catch (uploadError) {
            console.error("Error uploading image to Cloudinary", uploadError);
            return res
              .status(500)
              .json(new ApiError(500, "Error uploading image to Cloudinary"));
          }
        }
  
        const newBlog = new blogModel({
          title: blogTitle,
          content: blogContent,
          imageURL: imageUrl, // Save the uploaded image URL
          writtenBy: admin._id,
        });
  
        const savedBlog = await newBlog.save();
  
        return res
          .status(200)
          .json(
            new ApiResponse(200, savedBlog, "Blog has been successfully created")
          );
      } catch (err) {
        console.error(err);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
      }
    }
  );

const verifyUser = asyncHandler(
  async (req: RequestWithAdmin, res: Response) => {
    const admin = req.admin;

    if (admin) {
      return res.status(200).json(new ApiResponse(200, {}, "Good to go"));
    }
    return res.redirect("/");
  }
);


const addGalleryImageController = asyncHandler(
  async (req: RequestWithAdmin, res: Response) => {
    const admin: any = req.admin; 
    const { description } = req.body; 
    const file = req.file; 

    // Validate inputs
    if (isEmpty(description)) {
      return res
        .status(400)
        .json(new ApiError(400, "Description is required."));
    }

    if (!file) {
      return res.status(400).json(new ApiError(400, "Image is required."));
    }

    try {
      const imagePath = path.join(__dirname, "../../uploads", file.filename);

      if (!fs.existsSync(imagePath)) {
        return res.status(400).json(new ApiError(400, "Image file not found."));
      }

      const result = await cloudinary.uploader.upload(imagePath, {
        folder: "gallery_images",
      });

      const imageUrl = result.secure_url;

      
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting local file:", err);
        } else {
          console.log("Local file deleted successfully.");
        }
      });

      
      const newGalleryImage = new galleryModel({
        imageURL: imageUrl, 
        description: description, 
      });

      const savedGalleryImage = await newGalleryImage.save();

      return res.status(201).json(
        new ApiResponse(
          201,
          savedGalleryImage,
          "Gallery image added successfully."
        )
      );
    } catch (error: any) {
      console.error("Error uploading gallery image:", error);
      return res
        .status(500)
        .json(new ApiError(500, "Internal Server Error", error));
    }
  }
);


export {
  adminLoginController,
  adminCreateCampaignController,
  adminCreateBlogController,
  verifyUser,
  addGalleryImageController
};
