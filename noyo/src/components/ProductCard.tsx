// src/components/ProductCard.jsx
export default function ProductCard({ product }: { product: any }) {
  const defaultImageUrl = "https://img.drz.lazcdn.com/static/np/p/2ccfb3a51ba9c4d28f6988cbb1c003d0.jpg_400x400q75.avif";
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <img
        src={product.image || defaultImageUrl}
        alt={product.name}
        className="w-full h-40 object-cover rounded-xl mb-3"
      />
      <h2 className="text-lg font-semibold text-gray-800 truncate">
        {product.name}
      </h2>
      <p className="text-gray-500 text-sm mt-1">{product.description}</p>
      <div className="flex justify-between items-center mt-3">
        <span className="text-indigo-600 font-bold">
          ${product.price ?? "—"}
        </span>
        <button className="bg-indigo-600 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition">
          View
        </button>
      </div>
    </div>
  );
}
