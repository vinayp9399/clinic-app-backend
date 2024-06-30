const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/Clinic",{family:8,});
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
