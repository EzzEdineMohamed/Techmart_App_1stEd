import { Product } from "./Product";

export interface CartResponse {
    status : string ;
    numberOfCartItem : number;
    cartId : String ;
    data : CartData;
}

export interface CartData {
    _id : String ;
    cartOwner : String ;
    products : CartProduct[];
    createdAt : String;
    updatedAt : String;
    __v : number ;
    totalCartPrice : number;
}

export interface CartProduct {
    count : number;
    _id : String;
    product : Product;
    price : number;
}