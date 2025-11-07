export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-3xl font-serif text-center text-black mb-6">
        Search for Products
      </h1>

      {/* Categories */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {["Bodycare", "Skincare", "Haircare"].map((item) => (
          <button
            key={item}
            className="px-5 py-2 border border-pink-500 text-pink-600 rounded-md hover:bg-pink-500 hover:text-white transition"
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Type to search products..."
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>
    </div>
  );
}
