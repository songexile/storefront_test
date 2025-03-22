import React from "react";
import { Link } from "react-router-dom";
import { Product } from "./product.interface";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => (
  <div className="card w-full max-w-xs mx-auto bg-base-200 shadow-xl">
    <figure className="px-4 pt-4">
      <img
        className="object-contain h-40 w-40 rounded-xl"
        src={product.image}
        alt={product.title}
      />
    </figure>

    <div className="card-body items-center text-center">
      <Link
        to={`/products/${product.id}`}
        className="flex flex-col items-center flex-grow w-full"
      >
        <h2 className="card-title line-clamp-2">{product.title}</h2>
        <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
      </Link>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart(product);
        }}
        className="btn btn-secondary btn-block transition-transform transform hover:scale-105 hover:bg-secondary-focus"
      >
        Add to Cart
      </button>
    </div>
  </div>
);

export default ProductCard;
