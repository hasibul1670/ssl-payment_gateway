import axios from 'axios';
import { StatusCodes } from 'http-status-codes';

import { ApiError } from '../../../handlingError/ApiError';
import config from '../../../config';

const initSSLPayment = async (payload: any) => {
  try {
    const data = {
      store_id: config.ssl.storeId,
      store_passwd: config.ssl.storePass,
      total_amount: payload.total_amount,
      currency: 'BDT',
      tran_id: payload.tran_id, 
      success_url: 'http://localhost:3000/home/',
      fail_url: 'http://localhost:3000/fail',
      cancel_url: 'http://localhost:3000/cancel',
      ipn_url: 'http://localhost:3000/ipn',
      shipping_method: 'N/A',
      product_name: 'product Payment',
      product_category: 'Payment',
      product_profile: 'Student',
      cus_name: payload.cus_name,
      cus_email: payload.cus_email,
      cus_add1: payload.cus_add1,
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: payload.cus_phone,
      cus_fax: '01711111111',
      ship_name: 'Customer Name',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    };

    const response = await axios({
      method: 'post',
      url: config.ssl.sslPaymentUrl,
      data: data,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    console.log(response);

    return response.data;
  } catch (err) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Payment error');
  }
};

const validateSSLPayment = async (data: any) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${config.ssl.sslValidationUrl}?val_id=${data.val_id}&store_id=${config.ssl.storeId}&store_passwd=${config.ssl.storePass}&format=json`,
    });
    console.log(response);
    return response.data;
  } catch (err) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Payment error');
  }
};

export const sslService = {
  initSSLPayment,
  validateSSLPayment,
};
