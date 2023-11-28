import { Order, Product, Review, User } from "@prisma/client";

export interface CartItem {
    product:Product,
    quantity:number
}

export type OrderItemsProps = Order &{
    userOrder:User,
    productOrder:Product
}

export interface rowOrderTypes {
    id:string,
    customerName:string|null,
    address:string,
    phone:string,
    status:string|null,
    quantity:number,
    total:number,
    deliveredTime:Date|null
}

export type UsersProps = User &{
    reviews:Review[],
    orders:Order[]
}

export type OrdersProps = Order & {
    userOrder:User
}

export type ProductsProps = Product &{
    reviews:Review[],
    orders:Order[]
}