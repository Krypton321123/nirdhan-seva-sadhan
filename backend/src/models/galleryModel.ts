import mongoose from 'mongoose'

export interface GallerySchemaInterface extends mongoose.Document {
    imageURL: string;
    description: string;
    date?: Date;
  }

  const gallerySchema = new mongoose.Schema<GallerySchemaInterface>({
    imageURL: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 300,
    },

    date: {
      type: Date,
      default: Date.now, // Automatically captures the current date
    },
  });

  const galleryModel = mongoose.model<GallerySchemaInterface>('galleryImages', gallerySchema); 
  
  export { galleryModel }