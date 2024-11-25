import { Router } from "express";
import { getBlogs, getDetailedBlog, getLatestBlogs} from "../controllers/blogController.js";

const blogRouter = Router(); 

blogRouter.route('/latest').get(getLatestBlogs); 
blogRouter.route('/latestBlogs').get(getBlogs)
blogRouter.route('/getDetailedBlog/:id').get(getDetailedBlog); 

export { blogRouter }