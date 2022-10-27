const mongoose = require("mongoose")
const crmSchema = require("../models/crmModel")

const Contact = mongoose.model("contact", crmSchema)

const addNewContact = (req,res) => {
    const newContact = new Contact(req.body)
    newContact.save((err,contact) => {
        if(err)
            res.status(400).send(err)
        res.send(contact)
   })
}

const getContacts =(req,res) => {
    Contact.find({}, (err, contacts) => {
        if(err)
            res.status(404).send(err)
        res.send(contacts)
    })
}

const getContactWithId = async (req,res) => {
    try {
        const contact = await Contact.findById(req.params.contactID)
        if(!contact){
            return res.status(404).send()
        }else {
            res.json(contact)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateContact =(req,res) => {
    Contact.findByIdAndUpdate({_id: req.params.contactID}, req.body, {new:true, useFindAndModify:false}, (err, contact) => {
        if(err)
            res.status(404).send(err)
        res.send(contact)
    })
}

const deleteContact = (req,res) => {
    Contact.remove({_id: req.params.contactID},(err)=> {
        if(err)
            res.status(404).send(err)
        res.json({message: "Successfully deleted contact"})
    })
}

module.exports ={
    addNewContact,
    getContacts,
    getContactWithId,
    updateContact,
    deleteContact
}