import { Router } from "express";
import { home } from "../controllers";

const homeRouter = Router()

homeRouter.get("/", home)

export default homeRouter 
