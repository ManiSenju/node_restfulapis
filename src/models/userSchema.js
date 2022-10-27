const mongoose = require("mongoose")
const bycrypt = require("bcrypt")

const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    creadted_date: {
        type: Date,
        default: Date.now()
    }
})

UserSchema.methods.comparePasswords = (password,hashPassword) => {
    return bycrypt.compareSync(password,hashPassword)
}

module.exports = UserSchema