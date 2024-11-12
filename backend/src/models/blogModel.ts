import mongoose from 'mongoose'

export interface blogSchemaInterface extends mongoose.Document {
    title: string, 
    body: string, 
    writtenBy: mongoose.Schema.Types.ObjectId
}

const blogSchema = new mongoose.Schema<blogSchemaInterface>({
    title: {
        type: String, 
        minLength: 8,
        maxLength: 50, 
        required: true,  
    }, 
    body: {
        type: String, 
        required: true, 
        minLength: 100, // 100 characters
    }, 
    writtenBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admins', 
        required: true
    }
}, {timestamps: true})

const blogModel = mongoose.model<blogSchemaInterface>('Blogs', blogSchema)

export { blogModel }

