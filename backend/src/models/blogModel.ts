import mongoose from 'mongoose'

export interface blogSchemaInterface extends mongoose.Document {
    title: string, 
    content: string, 
    writtenBy: mongoose.Schema.Types.ObjectId
    imageURL: string
}

const blogSchema = new mongoose.Schema<blogSchemaInterface>({
    title: {
        type: String, 
        minLength: 3,
        maxLength: 50, 
        required: true,  
    }, 
    content: {
        type: String, 
        required: true, 
        minLength: 5, // 100 characters
    }, 
    imageURL: {
        type: String
    }, 
    writtenBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admins', 
        required: true
    }
}, {timestamps: true})

const blogModel = mongoose.model<blogSchemaInterface>('Blogs', blogSchema)

export { blogModel }

