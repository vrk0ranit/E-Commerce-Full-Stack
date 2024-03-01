const express = require("express");
const path = require("path");
const User = require("../model/user");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const jwt = require("jsonwebtoken");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userEmail = await User.findOne({ email });

        if (userEmail) {
            const filename = req.file.filename;
            const filePath = `uploads/${filename}`
            fs.unlink(filePath, (err) => {
                if(err){
                    console.log(err);
                    res.status(500).json({message: "Error deleting files"})
                }else{
                    res.json({message: "File deleted successfully"})
                }
            })
           return next(new ErrorHandler("User already exist", 400))
        }

        const filename = req.file.filename;
        const fileUrl = path.join(filename);

        const user = {
            name: name,
            email: email,
            password: password,
            avatar: {
                url: fileUrl,
                public_id: "some",
            },
        };

       const activationToken = createActivationToken(user);
       const activationUrl = `http://localhost:3000/activation/${activationToken}`

       try {
        
       } catch (error) {
        return next(new ErrorHandler(error.message, 500))
       }

    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});

//create activation token

const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET,{
        expiresIn: "5m"
    })
} 

//activate user


module.exports = router;
