import { Router } from "express";
import { productController } from "../controllers";

const productRouter = Router()

productRouter.get("/products", productController)

export default productRouter 
