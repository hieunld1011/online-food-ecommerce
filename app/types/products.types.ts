import { Product } from "@prisma/client";

interface ProductDetailsType extends Product  {
    reviews: {
        id: string;
        comment: string;
        rating: number;
        created_at: Date;
        updated_at: Date;
        product_id: string | null;
        user_id: string | null;
        user:{
            name:string
        }
    }[]
}
export type {ProductDetailsType}