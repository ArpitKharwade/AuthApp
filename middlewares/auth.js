//auth - Checks authentication , 
//isStudent, isAdmin - Checks authorization

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res,next) => {
    try{
        //extract jwt token
        const token = req.body.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token Missing',
            })
        }
         //verify token
         try{
            const payload = jwt.verify(token,process.env.JWT_SECRET);
            console.log(payload);

            req.user=payload;
         }
         catch(error){
            return res.status(401).json({
                success:false,
                message:'Token Invalid',
            })


         }
         next();

    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:'Something went wrong while verifying token',
        });

    }
}




exports.isStudent = (req,res,next) => {
    try{
          if(req.user.role !== 'Student'){
            return res.status(401).json({
                success:false,
                message:'This is protected route for students',
            });
          }
          next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User route is not matching',
        });

    }
}





exports.isAdmin = (req,res,next) => {
    try{
          if(req.user.role !== 'Admin'){
            return res.status(401).json({
                success:false,
                message:'This is protected route for admin',
            });
          }
          next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User route is not matching',
        });

    }
}