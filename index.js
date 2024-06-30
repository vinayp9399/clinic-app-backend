const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
const path = require('path');
const mongo = require('./config/mongodb_connect');
const users = mongo.users;
const multer = require('multer');
const corsConfig ={
  origin:"*",
  credential :true,
  methods: ["POST","PUT","GET","DELETE"],
 }
app.options("",cors(corsConfig));
app.use(cors(corsConfig));
app.use(express.json());
app.use('/users',require('./routes/useroutes'))
app.use('/appointments',require('./routes/appointmentroute'))
app.use(express.static(path.join(__dirname, 'public')));





const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

app.put('/image/:id', upload.single('image'),  async function (req, res) {
  let imagepath = req.file.path.slice(7,);
  
  let imageData =  {image:imagepath};
  try {await users.findByIdAndUpdate(req.params.id,imageData);}
  catch(err) {
    console.error(err.message);
}
  // res.send(JSON.stringify({'error':'','message':result}))
  res.send(imagepath);
})


// app.listen(port, () => {
//   console.log(`listening at http://localhost:${port}`)
// })

app.listen(port,(error)=>{
    console.log(`server has started at ${port}`)
})