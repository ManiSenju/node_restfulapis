const mongoose = require("mongoose")

const Schema = mongoose.Schema

const crmSchema = new Schema({
    firstName: {
        type: String,
        required: "Enter first name"
    },
    lastName: {
        type: String,
        required: "Enter last name"
    },
    email: {
        type: String,
    },
    company: {
        type: String,
    },
    phone: {
        type: Number,
    },
    creadted_date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = crmSchema