import mongoose from 'mongoose'

export interface campaignSchemaInterface extends mongoose.Document {
    name: string, 
    goal: number, 
    raised?: number, 
    description: string, 
    createdBy: mongoose.Schema.Types.ObjectId, 
    imageURL: string
}

const campaignSchema = new mongoose.Schema<campaignSchemaInterface>({
    name: {
        type: String, 
        minLength: 5, 
        maxLength: 50, 
        required: true, 
        unique: true
    }, 
    goal: {
        type: Number, 
        required: true, 
    }, 
    description: {
        type: String, 
        required: true
    }, 
    raised: {
        type: Number, 
        default: 0,  
    }, 
    imageURL: {
        type: String, 
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admins', 
        required: true, 
    },
}, {timestamps: true})

const campaignModel = mongoose.model<campaignSchemaInterface>('Campaigns', campaignSchema); 

export { campaignModel }