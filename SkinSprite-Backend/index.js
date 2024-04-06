const cors = require("cors");
const express = require("express")
const connectWithDb = require('./configs/db');
require("dotenv").config()

const multer = require('multer');
const axios = require('axios');




const app = express()
app.use(cors());
app.use(express.json());
app.use(express.static('front'))



//routes
const adminRouter = require("./routes/AdminRoute");
const doctorRoute = require("./routes/DoctorRoute");
const patientRoute = require('./routes/PatientRouter')
const paymentRouter = require("./routes/PaymentRoute");
const { url } = require("inspector");


//home-page
app.get("/", (req, res) => {
    res.send("server is working fine");
 });

 //multer
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), async (req, res) => {
    console.log('Received image upload request');
  const imageBuffer = req.file.buffer; // Assuming 'image' is the name attribute in your form

  // Send the image data to Flask server
  try {
    const flaskResponse = await axios.post('https://ce37-2401-4900-36a7-414a-873a-f947-7e8a-ef6d.ngrok-free.app/receive-image', {
      image: imageBuffer.toString('base64'), // Convert the image data to base64
    });

    // Do something with the response from Flask
    console.log(flaskResponse.data);

    // res.status(200).send('Image uploaded and processed successfully.');
    // res.send(flaskResponse)
    res.status(200).send(flaskResponse.data)
  } catch (error) {
    console.error('Error communicating with Flask server:', error.message);
    res.status(500).send('Internal Server Error');
  }
});


//in built middlewares
app.use("/admin", adminRouter);
app.use("/doctor",doctorRoute)
app.use("/patient",patientRoute)
app.use("/payment",paymentRouter)




//connect with db
connectWithDb()

app.listen(process.env.PORT,()=>{
    console.log(`server is running `);
})

