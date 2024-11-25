import Razorpay from "razorpay";
import crypto from "crypto";
import { paymentModel } from "../models/paymentModel.js"; // Assuming a schema to store payment info
import { isEmpty } from "../utils/isEmpty.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Request, Response } from "express";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

// 1. Order Creation
const createOrderController = asyncHandler(async (req: Request, res: Response) => {
  const { amount, currency = "INR", userDetails } = req.body;

  if (isEmpty(amount) || isEmpty(userDetails)) {
    return res.status(400).json(new ApiError(400, "Amount and user details are required"));
  }

  try {
    const order = await razorpayInstance.orders.create({
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: `receipt_${Date.now()}`,
    });

    return res.status(201).json(new ApiResponse(201, { order }, "Order created successfully"));
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return res.status(500).json(new ApiError(500, "Error creating payment order"));
  }
});

// 2. Payment Verification
const verifyPaymentController = asyncHandler(async (req: Request, res: Response) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (isEmpty(razorpay_order_id) || isEmpty(razorpay_payment_id) || isEmpty(razorpay_signature)) {
    return res.status(400).json(new ApiError(400, "Invalid payment details"));
  }

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    return res.status(400).json(new ApiError(400, "Payment verification failed"));
  }

  // Save payment details in the database
  try {
    const payment = new paymentModel({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      status: "Completed",
      amount: req.body.amount,
      userDetails: req.body.userDetails,
    });

    await payment.save();

    return res
      .status(200)
      .json(new ApiResponse(200, payment, "Payment verified successfully"));
  } catch (error) {
    console.error("Error saving payment details:", error);
    return res.status(500).json(new ApiError(500, "Error processing payment"));
  }
});

// 3. Webhook Handling
const webhookController = asyncHandler(async (req: Request, res: Response) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;
  const signature = req.headers["x-razorpay-signature"] as string;

  const body = JSON.stringify(req.body);
  const expectedSignature = crypto.createHmac("sha256", secret).update(body).digest("hex");

  if (expectedSignature !== signature) {
    return res.status(400).json(new ApiError(400, "Invalid webhook signature"));
  }

  // Process the event (e.g., payment captured)
  const event = req.body;
  try {
    if (event.event === "payment.captured") {
      await paymentModel.updateOne(
        { orderId: event.payload.payment.entity.order_id },
        { status: "Completed" }
      );
    }
    res.status(200).json(new ApiResponse(200, {}, "Webhook handled successfully"));
  } catch (error) {
    console.error("Error handling webhook:", error);
    return res.status(500).json(new ApiError(500, "Error handling webhook"));
  }
});
