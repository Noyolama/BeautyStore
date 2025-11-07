import { useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Products() {
    const [products ] = useState([])

  //   const fetchAllProducts = () => {
  //       api.get('/products')
  //       .then((res) => {
  //           setProducts(res?.data?.products)
  //       })
  //       .catch((err) => {
  //           console.log(err)
  //       })
  //   }

  // useEffect(() => {
  //   fetchAllProducts();
  // }, []);
  return (
 <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Products</h1>
      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
