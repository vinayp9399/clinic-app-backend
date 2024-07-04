const mongo = require('../config/mongodb_connect');
const users = mongo.users;
// const multer = require('multer');
//const users = require('../config/mongodb_connect');

// const storage = multer.diskStorage({
//     destination:function(request,file,cb){
//         cb(null,'./images')
//     },
//     filename:function(request,file,cb){
//         cb(null,file.originalname)
//     }
// })
// exports.uploadImage = multer({storage:storage}).single('image');

exports.userlist = async(request, response) =>{

    let result = await users.find();
    response.send(JSON.stringify({'error':'', 'message':result}))
}

exports.singleuser = async (request, response) =>{
    let doctors_id = {doctors_id:request.params.id}
    
    let result = await users.findById(request.params.id)
    response.send(JSON.stringify({'error':'', 'message':result}))
}

exports.registration = (request, response) =>{
    let doctorData = request.body

    const user = new users(doctorData)
    user.save();
    response.send(JSON.stringify({'error':'', 'message':"Registration succesfull"}))
    
    
}

exports.login = async(request,response)=>{
   
    const Password = request.body.password;
    let result = await users.findOne({phoneno:request.body.phoneno})
    //console.log(hashPassword)
    //console.log(result.password);
    if(!result){
        response.send(JSON.stringify({'error':'','message':'phoneno or password does not match'}))
    }
    else if(Password != result.password){
        response.send(JSON.stringify({'error':'','message':'phoneno or password does not match'}))
    }else{
        response.send(JSON.stringify({'error':'','message':result}))
    }
}

exports.deleteuser = async (request,response) =>{
    let users_id = {users_id:request.params.id}
   
    const result = await users.findByIdAndDelete(request.params.id)
    response.send(JSON.stringify({'error':'','message':'User deleted sucessfully'}))
}

exports.updateuser = async (request,response) =>{
    let users_id = {users_id:request.params.id}
    let registrationData =  {firstname:request.body.firstname,lastname:request.body.lastname,
        email:request.body.email,phoneno:request.body.phoneno}

    const result = await users.findByIdAndUpdate(request.params.id,registrationData)
    response.send(JSON.stringify({'error':'','message':'User updated sucessfully'}))

}

exports.finddoctor = async(request, response) =>{
   
    const result = await users.findOne({name:request.params.name, usertype:"doctor"})
    response.send(JSON.stringify({'error':'','message':result}))
}

exports.finddoctors = async(request, response) =>{
   
    const result = await users.find({usertype:"doctor"})
    response.send(JSON.stringify({'error':'','message':result}))
}

