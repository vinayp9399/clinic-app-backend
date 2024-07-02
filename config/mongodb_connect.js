const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://vinayp9399:mechanic%4093@vinaycluster.03uocxi.mongodb.net/onlineclinic?retryWrites=true&w=majority&appName=VinayCluster",{family:6,});
const usersSchema = {
    name:String,
    email:String,
    phoneno:String,
    details:String,
    password:String,
    usertype:String,
    image:String,
}

const appointmentsSchema = {
    doctorid:String,
    doctorname:String,
    name:String,
    age:String,
    gender:String,
    phoneno:String,
    symptoms:String,
    prescription:String,
}
const users = mongoose.model("Users",usersSchema);
const appointments = mongoose.model("Appointments",appointmentsSchema);
module.exports = {users, appointments};
