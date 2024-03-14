/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendReponse from '../../../shared/sendResponse';
import { IPayment } from './payment.interface';
import { PaymentService } from './payment.services';

const sendPaymentResponse = (res: Response, message: string, data: any) => {
  sendReponse<IPayment>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const { ...PaymentData } = req.body;
  const result = await PaymentService.createPayment(PaymentData);
  sendPaymentResponse(res, 'Payment is Created Successfully!', result);
});

const getAllPayments = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.getAllPayments();
  sendPaymentResponse(res, 'Payments retrieved successfully !', result);
});

const deletePayment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await PaymentService.deletePayment(id);
  sendPaymentResponse(res, ' Payment Deleted successfully !', result);
});
const getSinglePayment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await PaymentService.getSinglePayment(id);
  sendPaymentResponse(res, 'Single Payment retrieved successfully !', result);
});
const updatePayment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const UpdateData = req.body;
  const result = await PaymentService.updatePayment(id, UpdateData);
  sendPaymentResponse(res, 'Payment Data Is Updated successfully!', result);
});

export const PaymentController = {
  createPayment,
  getAllPayments,
  getSinglePayment,
  deletePayment,
  updatePayment,
};
