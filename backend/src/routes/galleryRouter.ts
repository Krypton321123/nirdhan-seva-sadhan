import express from 'express'
import { getGalleryData } from '../controllers/galleryControllers.js';

const galleryRouter = express.Router(); 

galleryRouter.route(`/get-gallery`).get(getGalleryData); 

export { galleryRouter }