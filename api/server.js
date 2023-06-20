const express = require("express");
const mongoose = require("mongoose");
const dotenv=require("dotenv");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const port = process.env.PORT || 5001;

//routes

const categoryRoute=require("./routes/categories.js");
const productRoute = require("./routes/products.js");
const billRoute = require("./routes/bills.js");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/users.js");

dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to mongoDB ")
    } catch (error) {
        throw error ; // yada console.log(error)
    }
};
// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.use("/api/categories",categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/bills", billRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);


//app.get("/", (req,res)=> res.send("Hello World!")) // 5001 portuma yani tarayicima 5001 gidince birsey yolluyorum .Bunu ui da yazdim gormek icin  

app.listen(port, () => {
    connect();
  console.log(`Example app listening on port ${port}`);
});