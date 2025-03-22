
import { Product } from './product.interface'
import ProductCard from './ProductCard'

interface RecommendedProductsProps {
  products: Product[]
  onAddToCart: (product: Product) => void
  title: string
}

function RecommendedProducts({ products, onAddToCart, title }: RecommendedProductsProps) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((prod) => (
          <ProductCard key={prod.id} product={prod} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  )
}

export default RecommendedProducts
