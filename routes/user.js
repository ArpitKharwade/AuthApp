const express =   require("express");
const router = express.Router();

const{login,signup} = require("../controllers/Auth");
const{auth, isStudent, isAdmin} = require("../middlewares/auth");

// router.post("./login",login);
router.post("/signup",signup);
router.post("/login",login);

//testing protected routes for single middleware
router.get("/test", auth, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for test',
    });
});

//Protected routes
router.get("/student", auth, isStudent, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for students',
    });
});

router.get("/admin", auth, isAdmin, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for admin',
    });
})

module.exports = router;