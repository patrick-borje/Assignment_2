import express from "express";


import { getContacts, getSpecificContacts, createContacts, updateContacts, deleteContacts } from "../controllers/contacts.controller.js";

const router = express.Router();

router.get("/", getContacts);
router.get("/:id", getSpecificContacts);
router.post("/", createContacts);
router.put("/:id", updateContacts);
router.delete("/:id", deleteContacts);

export default router;
