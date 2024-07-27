const express= require("express");
const app= express();
const addTwoNumber= (n1,n2)=>{
    return n1+n2;
}

app.get("/addTwoNumber",(req,res)=>{
    const n1= parseInt(req.query.n1);
    const n2= parseInt(req.query.n2);
    const result= addTwoNumber(n1,n2);
    res.json({statuscode:200, data:result});
});

app.get("/Display",(req,res)=>{
    const n1= "<html><body><H1>Hello There </H1></body></html>";
    res.set('Content-Type','text/html');
    res.send(Buffer.from(n1));
})
console.log(addTwoNumber(19,12));
const port=3040;
app.listen(port,()=>{
    console.log("Hello im listening to port" +port);
})