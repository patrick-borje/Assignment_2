import express from "express";

import {getUsers, getSpecificUsers, createUsers, updateUsers, deleteUsers} from '../controllers/users.controller.js'

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getSpecificUsers);
router.post("/", createUsers);
router.put("/:id", updateUsers);
router.delete("/:id", deleteUsers);

export default router;
