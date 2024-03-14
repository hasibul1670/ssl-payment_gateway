import { Schema, model } from 'mongoose';
import { IPayment, PaymentStatus } from './payment.interface';

// Define the Payment schema
const PaymentSchema = new Schema<IPayment>(
  {
    amount: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },
    transactionId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Define the Payment model
const PaymentModel = model<IPayment>('Payment', PaymentSchema);

export { IPayment, PaymentModel, PaymentStatus };
