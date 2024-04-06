const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
  userType: {
    type: String,
    default: "doctor",
  },

  doctorID: {
    type: Number,
    required: true,
  },
      
  doctortName: {
    type: String,
  },

  mobile: {
    type: Number,
    minlength: 10,
  },

  email: {
    type: String,
  },

  password: {
    type: String,
    default: "password",
  },

  age: {
    type: Number,
  },

  department: {
    type: String,
  },

  gender: {
    type: String,
  },

  dob: {
    type: String,
  },

  address: {
    type: String,
  },

  image: {
    type: String,
  },

  details: {
    type: String,
  },
  bloodGroup: {
    type: String,
  },

  date: {
    type: Date,
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg",
  },

  details: {
    type: String,
  },


});
const DoctorModel = mongoose.model("doctor", doctorSchema);

module.exports = { DoctorModel };

