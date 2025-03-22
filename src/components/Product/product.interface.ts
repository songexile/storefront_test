//down the line I will relocate file location  
  
  export interface Product {
    title: string,
    description: string,
    id: number,
    image: string,
    price: number,
    rating: Rating
    category: string;  
  }

  export interface Rating {
    rate: number;
    count: number;
  }
  
  export interface CartInterface {
    products: Product,  // Single product
    quantity: number
  }