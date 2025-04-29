const express =require("express");
const bodyParser = require('body-parser')

const app=express();

const data=[];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.send(data);
})

app.post('/',(req,res)=>{
    const s =req.body;
    data.push(s.name)
res.end();    
})
app.delete('/',(req,res)=>{
    data.length=0;
    res.status(200).send("Data deleted successfully");
})
app.listen(3000,()=>{
    console.log("port is lissiting");
    
})