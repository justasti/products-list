import { Product, useGetProductsQuery } from './api'

export const Products = () => {
  const { data: products } = useGetProductsQuery()
  return (
    <div>
      {products &&
        products.map((product: Product) => (
          <div key={product._id}>{product.productName}</div>
        ))}
    </div>
  )
}
