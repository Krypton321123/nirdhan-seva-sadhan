import {ApiResponse} from "../utils/apiResponse.js";
import {ApiError} from "../utils/apiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {isEmpty} from "../utils/isEmpty.js";
import {Request, Response} from "express";
import {adminInterface, adminModel} from "../models/adminModel.js";
import path from 'path'
import fs from 'fs'
import {campaignModel,} from "../models/campaignModels.js";
import {RequestWithAdmin} from "../utils/RequestWithUser.js";
import {blogModel, blogSchemaInterface} from "../models/blogModel.js";
import jsonwebtoken from "jsonwebtoken";
import {UploadApiResponse, v2 as cloudinary} from "cloudinary";
import {fileURLToPath} from 'url';
import dotenv from 'dotenv'
import {galleryModel} from "../models/galleryModel.js";
import {formSubmissionModel} from "../models/formModel.js";
import puppeteer from "puppeteer";

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

          const imagePath = path.join(__dirname, '../../uploads', file.filename);
          console.log("Image path to upload: ", imagePath);
    

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

          const imagePath = path.join(__dirname, "../../uploads", file.filename);
  
          try {

            const result = await cloudinary.uploader.upload(imagePath, {
              folder: "blog_images",
            });
            imageUrl = result.secure_url;
            console.log(imageUrl)
  

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

const getFormController = asyncHandler(async (req: Request, res: Response) => {
    const forms = await formSubmissionModel.find();

    if (!forms) {
        return res.status(500).json(new ApiError(500, "No forms available"));
    }

    return res.status(200).json(new ApiResponse(200, forms, "Forms fetched successfully"));
})

const approveForm = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id);
    const { isApproved } = req.body;

    if (!id) {
        return res.status(400).json(new ApiError(400, "No ID found"));
    }

    try {
        console.log("Idhar aagaye")
        const form = await formSubmissionModel.findById(id);

        if (!form) {
            return res.status(404).json(new ApiError(404, "Form not found"));
        }

        form.isApproved = isApproved;

        console.log("idhar aa gaye 2")
        if (isApproved) {
            console.log("idhar aagaye 4")
            // Generate ID card if approved
            form.imageURL = await generateIDcard({
                name: form.name,
                dob: form.dob,
                address: form.address,
                userImageURL: form.userImageURL
            });
        }
        console.log("Idhar aagaye 3")
        await form.save();

        res.status(200).json(new ApiResponse(200, form, isApproved ? "Form approved and ID card generated." : "Form rejected."));
    } catch (err) {
        console.log(err)
        res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
});

const adminGetCampaigns = asyncHandler(async (req: Request, res: Response) => {
    const campaigns = await campaignModel.find().sort({createdAt: -1});

    if (!campaigns || campaigns.length === 0) {
        return res.status(404).json(new ApiError(404, "No campaigns found"))
    }

    return res.status(200).json(new ApiResponse(200, campaigns, "Campaigns fetched successfully"));
})

const adminDeleteCampaign = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params;
    console.log(id);

    try {
        const campaign = await campaignModel.findById(id); // Find campaign by ID

        console.log(campaign)

        if (!campaign) {
            return res.status(404).json(new ApiError(404, "Campaign not found"));
        }

        await campaignModel.deleteOne({_id: campaign._id}); // Delete the campaign from the database

        return res.status(200).json(new ApiResponse(200, {}, "Campaign deleted successfully"));
    } catch (error: any) {
        console.error("Error deleting campaign:", error);
        return res.status(500).json(new ApiError(500, "Internal Server Error", error));
    }
})

const adminGetBlogs = asyncHandler(async (req: Request, res: Response) => {
    const blogs = await blogModel.find().sort({createdAt: -1});

    if (!blogs || blogs.length === 0) {
        return res.status(404).json(new ApiError(404, "No campaigns found"))
    }

    return res.status(200).json(new ApiResponse(200, blogs, "Campaigns fetched successfully"));
})

const adminDeleteBlog = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params;
    console.log(id);

    try {
        const blog = await blogModel.findById(id); // Find campaign by ID

        console.log(blog)

        if (!blog) {
            return res.status(404).json(new ApiError(404, "Campaign not found"));
        }

        await blogModel.deleteOne({_id: blog._id}); // Delete the campaign from the database

        return res.status(200).json(new ApiResponse(200, {}, "Campaign deleted successfully"));
    } catch (error: any) {
        console.error("Error deleting campaign:", error);
        return res.status(500).json(new ApiError(500, "Internal Server Error", error));
    }
})

const adminGetGallery = asyncHandler(async (req: Request, res: Response) => {
    const gallery = await galleryModel.find().sort({createdAt: -1});

    if (!gallery || gallery.length === 0) {
        return res.status(404).json(new ApiError(404, "No campaigns found"))
    }

    return res.status(200).json(new ApiResponse(200, gallery, "Campaigns fetched successfully"));
})

const adminDeleteGalleryItem = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params;
    console.log(id);

    try {
        const galleryImage = await galleryModel.findById(id); // Find campaign by ID

        console.log(galleryImage)

        if (!galleryImage) {
            return res.status(404).json(new ApiError(404, "Campaign not found"));
        }

        await galleryModel.deleteOne({_id: galleryImage._id}); // Delete the campaign from the database

        return res.status(200).json(new ApiResponse(200, {}, "Campaign deleted successfully"));
    } catch (error: any) {
        console.error("Error deleting campaign:", error);
        return res.status(500).json(new ApiError(500, "Internal Server Error", error));
    }
})

export {
  adminLoginController,
  adminCreateCampaignController,
  adminCreateBlogController,
  verifyUser,
  addGalleryImageController, getFormController, approveForm, adminGetCampaigns, adminDeleteCampaign, adminGetBlogs, adminDeleteBlog, adminGetGallery, adminDeleteGalleryItem
};


// --------------------------------------UTIL FUNCTIONS------------------------------------------------------- //



const generateIDcard = async (userData: { name: string; dob: string; address: string, userImageURL: string }) => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();

    console.log("Idhar aagaye 5")

    const html =`
    
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>ID Card</title>
      <style>
        @font-face {
          font-family: 'Noto Sans Devanagari';
          font-style: normal;
          font-weight: 400;
          src: url('https://fonts.gstatic.com/s/notosansdevanagari/v10/Pby6FmXiEBPT4ITbgNA5CgmOel9GpA9rfxefAMk.woff2') format('woff2');
        }
    
        body {
          font-family: 'Noto Sans Devanagari', Arial, sans-serif;
          background-color: #f4f4f9;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
    
        .id-card {
          width: 380px;
          border: 2px solid #333333;
          border-radius: 10px;
          background-color: #ffffff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          position: relative;
          overflow: hidden;
          padding: 10px 15px;
        }
    
        .id-card::before {
          content: "निर्धन सेवा संस्थान";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-0deg);
          font-size: 35px;
          font-weight: bold;
          color: rgba(0, 0, 0, 0.1); 
          z-index: 0;
          white-space: nowrap;
          pointer-events: none;
        }
    
        .id-card::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -40%);
          width: 200px;
          height: 200px;
          background: url('https://res.cloudinary.com/dneswskog/image/upload/f_auto,q_auto/opru24oorgegr42fgcrn') no-repeat center center;
          background-size: contain;
          opacity: 0.1;
          z-index: 0;
          pointer-events: none;
        }
    
        .header {
          display: block;
          background-color: #4caf50;
          color: #ffffff;
          padding: 5px 10px;
          border-radius: 8px;
          font-size: 18px;
          font-weight: bold;
          text-align: center;
          position: relative;
          z-index: 1;
        }
    
        .header .sub-text {
          font-size: 12px;
          margin-top: 5px;
          color: #ffffff;
          font-weight: normal;
        }
    
        .image-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 15px 0;
          position: relative;
          z-index: 1;
        }
    
        .image-container img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 2px solid #333333;
        }
    
        .highlight {
          margin: 15px 0;
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          color: #d32f2f;
          position: relative;
          z-index: 1;
        }
    
        .details {
          margin-top: 10px;
          text-align: left;
          font-size: 14px;
          color: #333333;
          position: relative;
          z-index: 1;
        }
    
        .details p {
          margin: 5px 0;
        }
    
        .details p span {
          font-weight: bold;
        }
    
        .footer {
          margin-top: 15px;
          font-size: 14px;
          color: #333333;
          font-weight: bold;
          text-align: center;
          position: relative;
          z-index: 1;
        }
    
        .footer .certified {
          margin-top: 10px;
          color: #4caf50;
          font-style: italic;
        }
      </style>
    </head>
    <body>
      <div class="id-card">
        <div class="header">
          <div>Nirdhan Sewa Sansthan</div>
          <div class="sub-text">ITA एवं नीति आयोग द्वारा अनुमोदित</div>
        </div>
        <div class="highlight">IDENTITY CARD</div>
    
        <div class="image-container">
          <img src="${userData.userImageURL}" alt="Profile Picture" />
        </div>
    
        <div class="details">
          <p><span>Name:</span> ${userData.name}</p>
          <p><span>D.O.B:</span> ${userData.dob}</p>
          <p><span>Valid Upto:</span> 31-Dec-2026</p>
          <p><span>Address:</span> ${userData.address}</p>
        </div>
    
        <div class="footer">
          <p>12A and 80G Certified</p>
          <div class="certified">विश्वास और प्रमाणन के माध्यम से जीवन सशक्त बनाना</div>
        </div>
      </div>
    </body>
    </html>
        `;
    await page.setContent(html);
    const screenshotBuffer = await page.screenshot(); //png id card

    await browser.close();

    const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {folder: 'id-cards'},
            (error, result) => {
                if (error) {
                    return reject(new Error('Error uploading image to Cloudinary: ' + error.message));
                }
                resolve(result as UploadApiResponse);
            }
        );
        uploadStream.write(screenshotBuffer);
        uploadStream.end();
    })

    return uploadResult.secure_url;
}

