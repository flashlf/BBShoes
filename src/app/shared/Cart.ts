export class Cart {
    cartID : string;
    productList : Array<{
        productKey: string,
        qty: number,
        productImage: string,
        status: number 
    }>;
    /**
     * Status
     * 1 = Checkout
     * 2 = Waiting Payment
     * 3 = Done Payment
     */
}