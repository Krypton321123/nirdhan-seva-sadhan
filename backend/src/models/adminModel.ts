import * as mongoose from 'mongoose'

export interface adminInterface {
    username: String, 
    password: String
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

const Admin = mongoose.model<adminInterface>(`Admins`, adminSchema); 

export { Admin }