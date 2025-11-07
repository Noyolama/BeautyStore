// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useWishlist } from "@/hooks/wishlist";
import { useRemoveWishlistItem } from "@/hooks/wishlist/use-remove-wishlist-item";
import { Link } from "react-router-dom";

export default function Wishlist() {

  const { wishlist } = useWishlist()
  const removeProductFromWishlist = useRemoveWishlistItem()
  const handleRemoveItem = (productId: string) => {
    removeProductFromWishlist.mutate(productId)

  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-medium text-center text-pink-500 mb-6">
        Your Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center text-black max-w-md mx-auto">
          <p className="mb-4 text-lg">
            This wishlist is empty.
          </p>
          <p className="mb-6">
            You don't have any products in the wishlist yet. You will find a lot of interesting products on our "Shop" page.
          </p>
          <Link
            to="/"
            className="inline-block bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
          >
            Return to Store
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg space-y-4">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border-b border-gray-200 pb-2"
            >
              <div>
                <Link to={`/products/${item?._id}/detail`} className="hover:text-primary hover:underline">
                  <h2 className="font-semibold">{item.name}</h2>
                </Link>
                <p className="text-gray-600">${item.price}</p>
              </div>
              <button
                onClick={() => handleRemoveItem(item._id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
