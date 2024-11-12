import * as mongoose from 'mongoose'

export interface adminInterface extends mongoose.Document {
    username: string, 
    password: string
}

const adminSchema = new mongoose.Schema<adminInterface>({
    username: {
        type: String, 
        required: true, 
        unique: true, 
    }, 
    password: {
        type: String, 
        minLength: 8, 
        maxLength: 50,
        required: true
    }
})

const adminModel = mongoose.model<adminInterface>(`Admins`, adminSchema); 

export { adminModel }