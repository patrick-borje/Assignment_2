// Creating the product model
 
import mongoose from "mongoose"; // First, you will need to import mongoose to the file.

// Second, you will create the product Schema.

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
        },
        password:{
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // this will include the createAt and updatedAt
    }
);

const User = mongoose.model('Product', userSchema); // This will be sent to mongo to create a model with the productSchema.

export default User; // This line will allow us to use the Product Model in other files.