const express = require('express')
const mongoose = require("mongoose")
require("dotenv").config()
const { AdminModel } = require("../models/AdminModel");
const {PatientModel} = require("../models/PatientModel")
const {DoctorModel} =require("../models/DoctorModel")
const jwt = require("jsonwebtoken")
const nodemailer =require("nodemailer")



const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const admins = await AdminModel.find();
    res.status(200).send(admins);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/register",async(req,res)=>{
    const {email} = req.body;
    try{
        const admin =  await AdminModel.findOne({email})
        if(admin){
            message: "admin already exist"
        }
        let value = new AdminModel(req.body)
        await value.save()
        const data = await AdminModel.findOne({email})
        res.status(200).send({ data, message: "Registered"})
    }
    catch(error){
        res.send({ message: "error" });
        console.log(error)
    }
})

router.post("/login", async(req,res)=>{
    const {adminId,password} = req.body;
    try{
        const admin = await AdminModel.findOne({adminId,password})
    if(admin){
        const token = jwt.sign({foo: "bar"},process.env.JWT_SECRET,{
            expiresIn : "24h",
        });
        res.send({message: "Successful", user: admin, token: token })
    }
    else{
        res.send({message: "worng credentials"})
    }
    }catch(error){
        console.log({ message: "Error" });
        console.log(error)
    }
})


router.patch("/:adminId",async(req,res)=>{
    const id =  req.params.adminId;
    const payload = req.body;
    try{
      const admin = await AdminModel.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(id) }, payload, { new: true });
        if(!admin){
            res.status(404).send({ msg: `Admin with id ${id} not found` });
        }
        res.status(200).send(`Admin with id ${id} updated`);
    }
    catch(error){
        console.log(error);
        res.status(400).send({ error: "Something went wrong, unable to Update." });
    }
})

router.delete("/:adminId", async (req, res) => {
  const id = req.params.adminId;
  try {
    const admin = await AdminModel.findByIdAndDelete({ _id: id });
    if (!admin) {
      res.status(404).send({ msg: `Admin with id ${id} not found` });
    }
    res.status(200).send(`Admin with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

  router.post("/password", (req, res) => {
    const { email, userId, password } = req.body;
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
      },
    });
  
    const mailOptions = {
      from:process.env.EMAIL_USER,
      to: email,
      subject: "Account ID and Password",
      text: `This is your User Id : ${userId} and  Password : ${password} .`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.send(error);
      }
      return res.send("Password reset email sent");
    });
  });

  router.post("/forgot", async(req,res)=>{
    const {email,type} = req.body;
    let user
    let userId
    let password
    if (type == "admin") {
        user = await AdminModel.find({ email });
        userId = user[0]?.adminID;
        password = user[0]?.password;
        user = await AdminModel.find({ email });
        userId = user.length > 0 ? user[0].adminId: undefined;
        password = user.length > 0 ? user[0].password : undefined;
        console.log(userId)
        console.log(password)
      }
      if (type == "patient") {
        user = await PatientModel.find({ email });
        userId = user[0]?.patientID;
        password = user[0]?.password;
      }
      if (type == "doctor") {
        user = await DoctorModel.find({ email });
        userId = user[0]?.doctorID;
        password = user[0]?.password;
      }
      if (!user) {
        return res.send({ message: "User not found" });
      }

      const  transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
         },
      })

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "AccountId and Password",
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333;
              text-align: center;
            }
            p {
              color: #555;
              line-height: 1.6;
            }
            ul {
              list-style: none;
              padding: 0;
            }
            li {
              margin-bottom: 10px;
            }
            .cta-button {
              display: inline-block;
              padding: 15px 30px;
              margin-top: 30px;
              background-color: #4caf50;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
              transition: background-color 0.3s ease;
            }
            .cta-button:hover {
              background-color: #45a049;
            }
            .footer-text {
              color: #888;
              font-size: 14px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 style="color: #007bff;">Password Reset</h1>
            <p>We received a request to reset your password. Here are your login details:</p>
            <ul>
              <li><strong>User ID:</strong>${userId}  </li>
              <li><strong>Password:</strong>${password} </li>
            </ul>
            <p>If you did not make this request, please ignore this email. If you have any concerns, please contact our support.</p>
            <a href="https://yourhealthcareservice.com" class="cta-button" style="background-color: #007bff;">Visit Our Site</a>
            <p class="footer-text">Best regards,<br>Your SkinSprite Team</p>
          </div>
        </body>
        </html>
         `,
      }  

      transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            return res.send(error)
        }
        return res.send("Password reset email sent"); 
      })


  })

  module.exports=router