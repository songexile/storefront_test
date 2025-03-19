export interface Product {
    title: string,
    description: string,
    id: number,
    image: string,
    price: number,
    quantity : number,
  
  
  }

  export interface CartInterface {
    products: Product[],
  }