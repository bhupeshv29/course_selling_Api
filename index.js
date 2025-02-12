import 'dotenv/config';
// console.log(process.env.Mongo_url);
import express from 'express'
import mongoose from 'mongoose'

const app  = express()

app.use(express.json())

app.use("api/v1/user", userRouter);
app.use("api/v1/admin", adminRouter);
app.use("api/v1/course", courseRouter);



async function main() {
    await mongoose.connect(process.env.Mongo_url)
    app.listen(3000);
    console.log("listening on port 3000")
}

main()