import axios from "axios";

// const API_URL = "http://127.0.0.1:5000/payment/";
const API_URL = "https://porkbuns-backend.vercel.app/payment/";

// get client secret
const getClientSecret = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const data = { id: id }
  const response = await axios.post(API_URL + "create-payment-intent", data, config);

  return response.data;
};

const paymentService = {
  getClientSecret,
};

export default paymentService;
