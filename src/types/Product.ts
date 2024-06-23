export default interface Product {
    name: string;
    price: number;
    description: string;
    brand: string;
    category: string;

    ram?: number;
    storage?: string;
    quantity?: number;

    mainImg?: string;
    subImg?: string[];
    videoUrl?: string;

    details?: object; 

    createdAt?: Date;
    updatedAt?: Date;
}