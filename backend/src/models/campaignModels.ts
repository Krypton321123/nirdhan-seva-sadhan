import mongoose from 'mongoose'

export interface campaignSchemaInterface extends mongoose.Document {
    name: string, 
    goal: number, 
    raised?: number, 
    createdBy: mongoose.Schema.Types.ObjectId, 
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
    raised: {
        type: Number, 
        default: 0,  
    }, 
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admins', 
        required: true, 
    },
}, {timestamps: true})

const campaignModel = mongoose.model<campaignSchemaInterface>('Campaigns', campaignSchema); 

export { campaignModel }