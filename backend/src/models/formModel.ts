import mongoose from 'mongoose';

export interface FormSubmissionInterface extends mongoose.Document {
    name: string;
    email: string;
    phone: string;
    address: string;
    purpose: string;
    dob: string;
    isApproved: boolean;
    generatedId: string; // A unique ID for tracking the user
    imageURL: string,
}

const formSubmissionSchema = new mongoose.Schema<FormSubmissionInterface>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, // Ensures one form per email
    phone: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    purpose: {
        type: String, required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    }, // Tracks admin approval
    generatedId: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
    }// UUID for tracking
}, { timestamps: true });

const formSubmissionModel = mongoose.model<FormSubmissionInterface>('FormSubmissions', formSubmissionSchema);

export { formSubmissionModel };