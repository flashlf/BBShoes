export class Cart {
    cartID : string;
    productList : Array<{
        productKey: string,
        productName: string,
        productImage: string,
        productPrice: number,
        productQty: number,
        productStatus: number 
    }>;
    /**
     * Status
     * 1 = Checkout
     * 2 = Waiting Payment
     * 3 = Done Payment
     */
}