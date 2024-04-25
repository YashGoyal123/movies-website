// register.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(email) {
                return /\S+@\S+\.\S+/.test(email); // Regular expression to validate email format
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female", "other"]
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(phone) {
                return /^\d{10}$/.test(phone); // Regular expression to validate phone number format
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    password: {
        type: String,
        required: true
    }
});

const Register = mongoose.model("Register", userSchema);

module.exports = Register;
