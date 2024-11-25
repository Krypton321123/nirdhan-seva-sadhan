import mongoose, { Schema, Document } from "mongoose";

interface Payment extends Document {
  orderId: string;
  paymentId: string;
  status: "Pending" | "Completed" | "Failed";
  amount: number;
  userDetails: {
    name: string;
    email: string;
    phone: string;
  };
}

const PaymentSchema: Schema = new Schema({
  orderId: { type: String, required: true },
  paymentId: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" },
  amount: { type: Number, required: true },
  userDetails: {
    name: { type: String, required: true },
    email: { type: String, default: '' },
    phone: { type: String, required: true },
  },
}, { timestamps: true });

export const paymentModel = mongoose.model<Payment>("Payment", PaymentSchema);
