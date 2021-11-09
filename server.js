const express = require("express")
const app = express()
const PORT = process.env.PORT || 3100
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const BodyParser = require("body-parser");

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

async function connectToDatabase(){
    await mongoose.connect(
        process.env.DATABASE_ACCESS,
        ()=>{console.log("Database connected")})
    
}

connectToDatabase()


const product = mongoose.model("shoprite products",{
    name:{
        type: String,
        required:true
    },
    price: {
        type : String,
        required:true
    }
})

app.get("/product/:name", async (req, res) => {
    try {
        var item = await product.find(({ name: { $regex: `${req.params.name}`, $options: "i" }}));
        res.send(item);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/products", async(req,res)=>{
    try {
        var items = await product.find({});
        res.send(items);
    } catch (error) {
        res.status(500).send(error);
    }
});
app.listen(PORT,()=>{console.log(`Server running ans listening at port ${PORT}`)})