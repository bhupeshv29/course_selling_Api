import { Router } from "express";
import { AdminModel } from "../db";
const adminRouter = Router()


adminRouter.post("/signup", async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        await AdminModel.create({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        });
    
        res.json({
            message: "Signup succeeded"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Signup failed",
            error: error.message
        });
    }
});

adminRouter.post("/signin", async(req,res)=>{
    const { email, password } = req.body;
    const admin = await adminModel.findOne({
        email: email,
        password: password
    });
    if (admin) {
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD);

        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})

adminRouter.post("/course", adminMiddleware, async function(req, res) {
    const adminId = req.userId;

    const { title, description, imageUrl, price } = req.body;


    const course = await courseModel.create({
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price, 
        creatorId: adminId
    })

    res.json({
        message: "Course created",
        courseId: course._id
    })
})