import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './backend/config/db.js';

 import contactRoutes from './backend/routes/contacts.route.js';
 import userRoutes from './backend/routes/users.route.js'

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});