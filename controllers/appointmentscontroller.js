const mongo = require('../config/mongodb_connect');
const appointments = mongo.appointments;
//const users = require('../config/mongodb_connect');

exports.appointmentlist = async(request, response) =>{
   
    let result = await appointments.find();
    response.send(JSON.stringify({'error':'', 'message':result}))
}

exports.singleappointmentlist = async (request, response) =>{

    let result = await appointments.findById(request.params.id)
    response.send(JSON.stringify({'error':'', 'message':result}))
}

exports.addappointment = (request, response) =>{
    let appointmentData = request.body

    const appointment = new appointments(appointmentData)
    appointment.save();
    response.send(JSON.stringify({'error':'', 'message':"Registration succesfull"}))
    
    
}

exports.deleteappointment = async (request,response) =>{
   
    const result = await appointments.findByIdAndDelete(request.params.id)
    response.send(JSON.stringify({'error':'','message':'User deleted sucessfully'}))
}

exports.updateappointment = async (request,response) =>{
    // let users_id = {users_id:request.params.id}
    let appointmentData =  request.body

    const result = await appointments.findByIdAndUpdate(request.params.id,appointmentData)
    response.send(JSON.stringify({'error':'','message':'User updated sucessfully'}))

}

exports.findappointments = async(request, response) =>{

    const result = await appointments.find({doctorid:request.params.doctorid})
    response.send(JSON.stringify({'error':'','message':result}))
}

exports.findpatient = async(request, response) =>{
   
    const result = await appointments.findOne({doctorid:request.params.doctorid, phoneno:request.params.phoneno})
    if(!result){
        response.send(JSON.stringify({'error':'','message':'no record found'}))
    }
    else{response.send(JSON.stringify({'error':'','message':result}))}
}

exports.findstatus = async(request, response) =>{
   
    const result = await appointments.find({doctorid:request.params.doctorid, status:"not visited"})
    response.send(JSON.stringify({'error':'','message':result}))
}

exports.docfollowups = async(request, response) =>{
    let date = new Date;
    let datefollow = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`
    const result = await appointments.find({doctorid:request.params.doctorid, followupdate:datefollow})
    response.send(JSON.stringify({'error':'','message':result}))
}
