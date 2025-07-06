import jwt from 'jsonwebtoken';

// Middleware to function to decode jwt token to get clerkId

const authUser = async(req, res, next) => {
     
    try{
          const {token} = req.headers;
          if(!token){
            res.json({
                success:false,
                message:"Token is required"
            })
          }

          const token_decode  = jwt.decode(token);
          if (!req.body) {
                req.body = {}; 
             }
          req.body.clerkId = token_decode.sub;
          next();

    }catch(error){
      console.error("Error in authUser middleware:", error.message);
      res.json({
          success: false,
          message: error.message
      });
    }
}

export default authUser;
