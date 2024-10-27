import mongoose from "mongoose";
import Contact from "../models/contacts.model.js";

// THIS FUNCTION IS TO GET ALL THE Contacts
export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({}); // Fetching the contacts. If we leave the find() method blank, it will fetch all the products.
        res.status(200).json({success: true, data: contacts});
    } catch (error) {
        console.log("error in fetching contacts: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const getSpecificContacts = async (req, res) => {
    const {id} = req.params;

    const contacts = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "contact not found!"})
    }

    try {
        const specificContact = await Contact.findById(id, contacts, {new: true});
        res.status(200).json({success: true, data: specificContact});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    } 
}

// THIS FUNCTION IS FOR CREATING Contacts
export const createContacts = async (req, res) => {
    const contacts = req.body; // The user will send this data.

    // This will check if the following fields are provided properly.
    if(!contacts.firstname || !contacts.lastname || !contacts.email){
        return res.status(400).json({success: false, message: "Please provide all fields."});
    }

    const newContacts = new Contact(contacts); // This line creates a new contact. 


    try{
        await newContacts.save(); // This line will save the product to the database.
        res.status(201).json({success: true, data: newContacts});
    }catch(error){
        console.error("Error in Creating product: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }

}

// THIS FUNCTION IS FOR UPDATING Contacts
export const updateContacts = async (req, res) => {
    const {id} = req.params;

    const contacts = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Product not found!"})
    }

    try {
        const updatedContacts = await Contact.findByIdAndUpdate(id, contacts, {new: true});
        res.status(200).json({success: true, data: updatedContacts});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    } 
    
}

// THIS FUNCTION IS FOR DELETING Contacts
export const deleteContacts = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Product not found!"})
    }
    
    try{
        await Contact.findByIdAndDelete(id); // This will allow us to find the ID of the product that we are trying to delete.
        res.status(200).json({success: true, message: "Product Deleted"});
    } catch(error){
        res.status(500).json({success: false, message: "Server Error"});
    }
}

