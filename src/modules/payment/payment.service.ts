const createPaymentIntentIntoDB = async () => {
  //Create a payment intent/session for an approved rental
};

const createPaymentConfirmIntoDB = async () => {
  // Confirm/verify payment (webhook or callback)
};
const getMyAllPaymentHistoryFromDB = async () => {
  // Get user's payment history
};
const getMySinglePaymentFromDB = async () => {
  // Get payment details
};

export const paymentService = {
  createPaymentIntentIntoDB,
  createPaymentConfirmIntoDB,
  getMyAllPaymentHistoryFromDB,
  getMySinglePaymentFromDB,
};
