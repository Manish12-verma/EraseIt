import userModel from "../models/userModel.js";
import { Webhook } from "svix";
import razorpay from "razorpay";
import transactionModel from "../models/transactionModel.js";

//API controller functions to manage clerk user with database
//http://localhost:4000/api/user/webhooks

const clerkWebhooks = async (req, res) => {

    try {

        //create a Svix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        const { data, type } = req.body;

        switch (type) {
            case "user.created": {

                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url
                }

                await userModel.create(userData);
                res.json({});

                break;
            }
            case "user.updated": {

                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url
                }

                await userModel.findOneAndUpdate({ clerkId: data.id },userData)
                res.json({});

                break;

            }
            case "user.deleted": {
                  
                await userModel.findOneAndDelete({ clerkId: data.id });
                res.json({});
                 
                break; 
            }

        }

    } catch (error) {
        console.error("Webhook verification failed:", error.message);
        return res.status(400).json({ success: false, message: "Webhook verification failed" });

    }
}


//API controller function to  get user available credits

const userCredits = async (req, res) => {
      try {
        
        const {clerkId} = req.body;
        const userData = await userModel.findOne({ clerkId });
        
        res.json({
            success: true,
            credits: userData.creditBalance || 0,
        });
       
      } catch (error) {
        console.error("Error fetching user credits:", error.message);
        return res.status(500).json({ success: false, message: "Error fetching user credits" }); 
      }
}

//gateway initialization
const razorpayGateway = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//API controller function to create a new order for user credits

const paymentRazorpay = async (req, res) => {
  try {
    const { clerkId, planId } = req.body;


    const userData = await userModel.findOne({ clerkId });


    if (!userData || !planId) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    let credits, plan, amount, date;

    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;
      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;
      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 250;
        break;
      default:
        return res.json({ success: false, message: "Invalid plan" });
    }

    date = Date.now();

    const transactionData = {
      clerkId,
      plan,
      amount,
      credits,
      date,
    };


    const newTransaction = await transactionModel.create(transactionData);


    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY || "INR",
      receipt: newTransaction._id.toString(),
    };

    const order = await razorpayGateway.orders.create(options);

    return res.json({ success: true, order });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.error?.description || error.message || "Unknown error",
    });
  }
};

//API controller function to handle Razorpay payment success->verification

const verifyRazorpay = async(req,res)=>{
    try {
        const {razorpay_order_id} = req.body;

        const orderInfo = await razorpayGateway.orders.fetch(razorpay_order_id);
        if (orderInfo.status === "paid") {
            const transactionData = await transactionModel.findById(orderInfo.receipt );
            if(transactionData.payment){
                return res.json({ success: false, message: "Payment failed" });
            }

            //Adding credits to user
            const userData = await userModel.findOne({ clerkId: transactionData.clerkId });
            if (!userData) {
                return res.json({ success: false, message: "User not found" });
            }
             
          const creditBalance = userData.creditBalance || 0 + transactionData.credits;
          await userModel.findOneAndUpdate(userData._id, { creditBalance });

          //Updating transaction as paid
          await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });
          return res.json({ success: true, message: "Payment successful" });
            
        }
        return res.json({ success: false, message: "Payment failed" });

    } catch (error) {
       console.log("Error verifying Razorpay payment:", error.message);
         return res.json({ success: false, message:error.message});  
    } 
}



export { clerkWebhooks, userCredits,paymentRazorpay , verifyRazorpay };
