import axios from "axios";

const API_URL = "http://127.0.0.1:5007/payment/";

// get client secret
const handlePaymentCompletion = async (therapistId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const data = { therapistId: therapistId }
  const response = await axios.post(API_URL + "completeMeeting", data, config);

  return response.data;
};

const paymentService = {
  handlePaymentCompletion,
}; 

export default paymentService;
