import mongoose from "mongoose";
import User from "../models/users.model.js";

// THIS FUNCTION IS TO GET ALL THE Contacts
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}); // Fetching the contacts. If we leave the find() method blank, it will fetch all the products.
        res.status(200).json({success: true, data: users});
    } catch (error) {
        console.log("error in fetching user: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const getSpecificUsers = async (req, res) => {
    const {id} = req.params;

    const users = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "user not found!"})
    }

    try {
        const specificuser = await User.findById(id, users, {new: true});
        res.status(200).json({success: true, data: specificuser});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    } 
}

// THIS FUNCTION IS FOR CREATING Contacts
export const createUsers = async (req, res) => {
    const users = req.body; // The user will send this data.

    // This will check if the following fields are provided properly.
    if(!users.name || !users.email || !users.password){
        return res.status(400).json({success: false, message: "Please provide all fields."});
    }

    const newUsers = new User(users); // This line creates a new contact. 


    try{
        await newUsers.save(); // This line will save the product to the database.
        res.status(201).json({success: true, data: newUsers});
    }catch(error){
        console.error("Error in Creating contact: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }

}

// THIS FUNCTION IS FOR UPDATING Contacts
export const updateUsers = async (req, res) => {
    const {id} = req.params;

    const users = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "user not found!"})
    }

    try {
        const updatedUsers = await User.findByIdAndUpdate(id, users, {new: true});
        res.status(200).json({success: true, data: updatedUsers});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    } 
    
}

// THIS FUNCTION IS FOR DELETING Contacts
export const deleteUsers = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "user not found!"})
    }
    
    try{
        await User.findByIdAndDelete(id); // This will allow us to find the ID of the product that we are trying to delete.
        res.status(200).json({success: true, message: "user Deleted"});
    } catch(error){
        res.status(500).json({success: false, message: "Server Error"});
    }
}

