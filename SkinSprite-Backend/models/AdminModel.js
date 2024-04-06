const mongoose= require("mongoose") 
const adminSchema = new mongoose.Schema({
    userType:{
        type: String,
        default: "admin"
    },
    adminId:{
        type: String,
        required :[true, "Please provide a Id"],
        unique: true,
    },
    adminName:{
        type: String,
    },
    password:{
        type: String,
        required :[true,"Please provide a password"],
        minlength: [8, "password should be atleast 8 char"],
        unique: true,
    },
    email:{
        type: String,
        unique: true,
        required :[true, "Please provide a email"],
    },
    age:{
        type: Number,
    },
    gender:{
        type: String,
    },
    mobile:{
        type: Number,
        required: false,
        minlength: 10,
    },
    dob: {
        type: Date,
    },
    address:{
        type: String,
    },
    education:{
        type: String,
    },
    image:{
        type: String,
        default: "https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg"
    }
})

const AdminModel = mongoose.model("Admin", adminSchema);

module.exports = { AdminModel };