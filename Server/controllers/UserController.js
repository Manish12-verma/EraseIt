import { Webhook } from "svix"
import userModel from "../models/UserModel.js";

//API controller Function to manage clerk user with database
//http://localhost:5000/api/user/webhooks

const clerkWebhooks = async (req, res) => {
      try {
          //Create a Svix webhook instance
          const whook = new Webhook(process.env.CLERK_WEBHOOK);
          
          await whook.verify(JSON.stringify(req.body),{
              "svix-id": req.headers["svix-id"],
              "svix-timestamp": req.headers["svix-timestamp"],
              "svix-signature": req.headers["svix-signature"]
            });

            const {data,type} = req.body;

            switch(type){
                case "user.created":{
                     console.log("Handling user.created...");
                    const userData = {
                        clerkId: data.id,
                        email: data.email_addresses[0].email_address,
                        firstName: data.first_name,
                        lastName: data.last_name, 
                        photo:data.image_url
                    }
                     await userModel.create(userData);
                     console.log("✅ User saved:");
                        res.json({ });
                      
                     break;
                }
                case "user.updated":{
                     
                     const userData = {
                        email: data.email_addresses[0].email_address,
                        firstName: data.first_name,
                        lastName: data.last_name, 
                        photo:data.image_url
                    }

                    await userModel.findOneAndUpdate({
                        clerkId:data.id
                    },userData)

                    res.json({});

                     break;
                }
                case "user.deleted":{
                     
                    await userModel.findOneAndDelete({
                        clerkId:data.id  
                    })

                    res.json({});

                     break;
                }
                  

                default:
                    break;
            }
      } catch (error) {
         console.error("🔥 ERROR in webhook handler:", error);
         console.log(error.message)
         res.json({
            success: false,
            message: error.message || "Internal Server Error"
        });
      }
}

export { clerkWebhooks };