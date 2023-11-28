import { Product, Review } from "@prisma/client";


export type ProductDetailsType = Product & {
    reviews:Review[]
}