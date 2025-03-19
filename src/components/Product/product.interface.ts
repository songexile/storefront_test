  export interface Product {
    title: string,
    description: string,
    id: number,
    image: string,
    price: number,
    rating: Rating
  }

  export interface Rating {
    rate: number;
    count: number;
  }
  
  export interface CartInterface {
    products: Product,  // Single product
    quantity: number
  }