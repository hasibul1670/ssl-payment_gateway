import { sslService } from '../ssl/ssl.service';
import { IPayment } from './payment.interface';
import { Payment } from './payment.model';

const createPayment = async (payload: IPayment): Promise<IPayment> => {
      const paymentSession = await sslService.initSSLPayment({
        total_amount: payload.amount,
        tran_id: payload.transactionId,
        cus_name: payload.studentName,
        cus_email: payload.studentEmail,
        cus_add1: payload.address,
        cus_phone: payload.phone,
      });

  const result = await Payment.create(payload);

    console.log(paymentSession);

    return paymentSession.redirectGatewayURL;
};



const webhook = async (payload: any) => {
  if (!payload || !payload?.status || payload?.status !== 'VALID') {
    return {
      massage: 'Invalid Payment!',
    };
  }
  const result = await sslService.validate(payload);

  if (result?.status !== 'VALID') {
    return {
      massage: 'Payment failed',
    };
  }

  const { tran_id } = result;
  await prisma.payment.updateMany({
    where: {
      transactionId: tran_id,
    },
    data: {
      status: PaymentStatus.PAID,
      paymentGatewayData: payload,
    },
  });

  return {
    massage: 'Payment Success',
  };
};










const getAllPayments = async () => {
  const result = await Payment.find();
  return result;
};

const getSinglePayment = async (id: string) => {
  const result = await Payment.findById({ _id: id });
  return result;
};

const deletePayment = async (id: string) => {
  const result = await Payment.findOneAndDelete({ id: id });
  return result;
};
const updatePayment = async (
  id: string,
  payload: Partial<IPayment>
): Promise<IPayment | null> => {
  const result = await Payment.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const PaymentService = {
  createPayment,
  deletePayment,
  getAllPayments,
  getSinglePayment,
  updatePayment,
};
