const mongoose = require("mongoose");
const Chat = require("./models/chat");

main().then(()=>{
    console.log("connection succesfull")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let AllChats =  [{
    from:"gaurav",
    to:"bhavesh",
    msg:"JAY BHADRA MARUTI",
    created_at: new Date(),
},
{
    from:"mahesh",
    to:"bhavesh",
    msg:"heater aan",
    created_at: new Date(),
},{
    from:"bhavesh",
    to:"mahesh",
    msg:"ho anto",
    created_at: new Date(),
},{
    from:"bhagesh",
    to:"bhavesh",
    msg:"chal gym la",
    created_at: new Date(),
},{
    from:"bhavesh",
    to:"bhagesh ",
    msg:"nlo aj legs day ahe",
    created_at: new Date(),
}];
Chat.insertMany(AllChats);
