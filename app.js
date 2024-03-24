const express = require("express");
const app= express();
const ExpressError=require("./ExpessError");

// app.use((req,res,next)=>{
//     console.log("I am middleware1 man");
//     next();
//     // console.log("i am after next")
// });
// app.use((req,res,next)=>{
//     console.log("I am middleware2 man");
//     return next();
// })
// app.use((req,res,next)=>{
//     let time=new Date(Date.now()).toString();
//     console.log(req.method,req.path,req.hostname,time);
// })


//api Token as query string

// app.use("/api",(req,res,next)=>{
    //     let {token}=req.query;
    //     console.log(token);
    //     if (token === "access") {
        //         next();
//     }
//     res.send("Access is denided");
// });
// app.get("/api",(req,res)=>{
//     res.send("access allowed");
// })


//multiple middleware

// const checkToken=(req,res,next)=>{
//     let {token}=req.query;
//     console.log(token);
//     if (token === "access") {
//         next();
//     }
//     res.send("Access is denided");
// };
// app.get("/api", checkToken ,(req,res)=>{
//     res.send("access allowed");
// })


//error handler

const checkToken=(req,res,next)=>{
    let {token}=req.query;
    console.log(token);
    if (token === "access") {
        next();
    }
    throw new ExpressError(401,"Access Denied");
};
app.get("/api", checkToken ,(req,res)=>{
    res.send("access allowed");
})

//Activity
app.get("/admin",(req,res)=>{
    throw new ExpressError(403,"Access to admin is forbidden");
})
 
app.use("/random",(req,res,next)=>{
    res.send("I am a random");
    next();
})


app.get("/",(req,res)=>{
    res.send("hello boss i am the root");
})
app.get("/random",(req,res)=>{
    res.send("hello boss i am the random");
})

app.get("/err",(req,res)=>{
    abcd=abcd;
})

app.use((err,req,res,next)=>{
    let {status=500,message="error message not found"}=err;
    res.status(status).send(message);
})

// app.use((err,req,res,next)=>{
//     console.log("----- Error2 middleware -----");
//     next(err);
// })

//404
// app.use((req,res)=>{
//     res.send("Page not found bro");
// })
app.listen(8080,()=>{
    console.log("app is listening");
})