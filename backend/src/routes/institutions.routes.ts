import express from "express";
import { createInstitution } from "../controllers/institutions.controller.js";
//import the protect router but first have to make the logic of the protect route

const router = express.Router();

router.post('/', createInstitution );

export default router;
