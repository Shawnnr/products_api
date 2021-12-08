const express = require("express")
const app = express()
const PORT = process.env.PORT || 3100
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const BodyParser = require("body-parser");
const cors = require("cors")

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors())

async function connectToDatabase(){
    await mongoose.connect(
        process.env.DATABASE_ACCESS,
        ()=>{console.log("Database connected")})
    
}

connectToDatabase()


const shoptiteProducts = mongoose.model("shoprite products",{
    name:{
        type: String,
        required:true
    },
    price: {
        type : String,
        required:true
    }
})

const pnpProducts = mongoose.model("pnp products",{
    name:{
        type: String,
        require:true
    },
    price: {
        type:String,
        require:true
    }
})

app.get("/product/:name", async (req, res) => {
    try {
        var item = await shoptiteProducts.find(({ name: { $regex: `${req.params.name}`, $options: "i" }}));
        res.send(item);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/products/shoprite", async(req,res)=>{
    try {
        const items = await shoptiteProducts.find({});
        res.send(items);
    } catch (error) {
        res.send(error);
    }
});

app.get("/products/pnp", async(req,res)=>{
    try{
        const items = await pnpProducts.find({});
        res.send(items)
    } catch(error){
        res.send(error)
    }
})
app.listen(PORT,()=>{console.log(`Server running ans listening at port ${PORT}`)})