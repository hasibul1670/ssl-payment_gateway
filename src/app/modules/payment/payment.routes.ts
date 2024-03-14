import express from 'express';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { PaymentController } from './payment.controller';

const router = express.Router();
router.post(
  '/create-payment',
  //auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.INSTRUCTOR),
  PaymentController.createPayment
);
router.get('/:id', PaymentController.getSinglePayment);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  PaymentController.deletePayment
);

router.patch(
  '/:id',

  auth(ENUM_USER_ROLE.ADMIN),
  PaymentController.updatePayment
);
router.get('/', PaymentController.getAllPayments);

export const paymentRoutes = router;
