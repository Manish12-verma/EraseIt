import { Webhook } from "svix";
import userModel from "../models/UserModel.js";

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK);

    const payload = req.body.toString("utf8");
    console.log("🚀 Webhook invoked. Raw payload:", payload);

    await whook.verify(payload, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });
    console.log("✅ Webhook verified successfully");

    const { data, type } = JSON.parse(payload);
    console.log("Event type:", type);
    console.log("Event data:", JSON.stringify(data, null, 2));

    switch (type) {
      case "user.created":
        console.log("Handling user.created...");
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name || "First",
          lastName: data.last_name || "Last",
          photo: data.image_url || "https://default-avatar.com/avatar.png",
        };
        const createdUser = await userModel.create(userData);
        console.log("✅ User saved:", createdUser);

        return res.json({ success: true });

      default:
        console.log("Unhandled event:", type);
        return res.json({ success: true });
    }
  } catch (error) {
    console.error("🔥 ERROR in webhook handler:", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { clerkWebhooks };
