const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

// Set up the view engine and static folder
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
// MongoDB connection
main()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// Home route
app.get("/", (req, res) => {
  res.send("APP STARTED");
  res.redirect("/chats");
});

// Chat index route
app.get("/chats", async (req, res) => {
  try {
    let chats = await Chat.find();
    res.render("index", { chats });
  } catch (error) {
    res.status(500).send("Error fetching chats");
  }
});

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`APP IS LISTENING ON PORT ${port}`);
});

// new route


app.get("/chats/new",(req,res)=>{
  res.render("new.ejs");
})


//create new route
app.post("/chats",(req,res)=>{
  let { from, to,msg} = req.body;
  let newChat = new Chat ({
    from: from,
    to: to,
    msg:msg,
    created_at:new Date()
  });

  newChat
   .save()
   .then((res)=>{
    console.log("chat was saved")
   })
    .catch((err)=>
    {
      console.log(err);
    });
  
  res.redirect("/chats")
})

//edit route
app.get("/chat/:id/edit",async(req,res)=>{
  let {id}= req.params;
  let chat =  await Chat.findById(id);
  res.render("edit.ejs",{chat})
})

 // update route
 app.put("/chat/:id",async(req,res)=>{
  let {id}= req.params;
  let{msg:newMsg}=req.body;
  let updatedChat =  await Chat.findByIdAndUpdate( id,{msg:newMsg}, {runValidators:true,new:true});
  res.redirect("/chats");
  console.log(updatedChat);
 })

  app.delete("/chat/:id", async (req,res)=>{
    let {id}= req.params;
    let deleteChat = await Chat.findByIdAndDelete( id );
    console.log(deleteChat);
    res.redirect("/chats");

  })