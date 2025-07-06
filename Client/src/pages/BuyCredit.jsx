import { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import axios from "axios";

const BuyCredit = () => {
  const { backendUrl, loadCreditsData } = useContext(AppContext);

  const navigate = useNavigate();

  const { getToken, userId } = useAuth();

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log("Payment response:", response);
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const paymentRazorpay = async (planId) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/user/pay-razor`,
        { clerkId: userId, planId },
        {
          headers: {
            token,
          },
        }
      );
      if (data.success) {
        initPay(data.order);
      } else {
        console.error("Payment error:", data.message);
        toast.error(data.message || "Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <div className="min-h-[90vh] text-center pt-14 mb-10">
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
        Our Plans
      </button>
      <h1 className="text-center text-2xl  md:text-3xl  lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent mb-6 sm:mb-10">
        Choose the plan that's right for you
      </h1>
      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((plan, index) => (
          <div
            className="bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-700 hover:scale-105 transition-all duration-500"
            key={index}
          >
            <img src={assets.logo_icon} width={45} />
            <p className="mt-3 font-semibold">{plan.id}</p>
            <p className="text-sm">{plan.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-md">${plan.price}</span>/
              {plan.credits} credits{" "}
            </p>
            <button
              onClick={() => paymentRazorpay(plan.id)}
              className="w-full bg-gray-800 text-white r mt-8  text-sm rounded-md py-2.5 min-w-52"
            >
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredit;
