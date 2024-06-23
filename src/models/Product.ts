import mongoose, { Schema, Model } from "mongoose";
import { Product } from "../types";

const productSchema = new Schema<Product>({
    // Product Information
    name: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },

    // Product Specification
    ram: {
        type: Number,
    },
    storage: {
        type: Number,
    },
    quantity: {
        type: Number,
    },

    details: {
        type: Object,
    },
    
    // Product Media
    mainImg: String,
    subImg: [String],
    videoUrl: String
    
}, { timestamps: true });

const Product: Model<Product> = mongoose.model<Product>('Product', productSchema);

export default Product;