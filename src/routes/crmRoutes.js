const { addNewContact, getContacts, getContactWithId, updateContact, deleteContact } = require("../controllers/crmController")
const { loginRequired, login, register } = require("../controllers/userController")

module.exports = (app) => {
    app.route("/contact")
        .get((req, res, next) => {
            console.log(`type is ${req.method}`)
            console.log(`url is: ${req.originalUrl}`)
            next()
        }, loginRequired,getContacts)
        .post(loginRequired,addNewContact)

    app.route("/contact/:contactID")
        .get(loginRequired,getContactWithId)
        .put(loginRequired,updateContact)
        .delete(loginRequired,deleteContact)

    
    app.route("/signup")
        .post(register)
    

    app.route("/login")
        .post(login)
}