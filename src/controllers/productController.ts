import { Request, Response } from "express"
import { Product as productType } from "../types"
import { Product } from "../models"

const productController = async (req: Request, res: Response) => {
    try {
        const products: productType[] = await Product.find({})
        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(500).json({ 
            message: "Server Error"
        })
    }
}

export default productController