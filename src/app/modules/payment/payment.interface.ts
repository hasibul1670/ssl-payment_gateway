import { Model } from 'mongoose';

// eslint-disable-next-line no-unused-vars
export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
}

export type IPayment = {
  id: string;
  amount: number;
  userId: string;
  status: PaymentStatus;
  transactionId: string;
};

export type paymentModel = Model<IPayment>;

export type IpaymentFilters = {
  searchTerm?: string;
};
