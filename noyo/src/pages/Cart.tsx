import { useMutation, useQueryClient } from "@tanstack/react-query";
import { decreaseItemFromCart, removeItemFromCart } from "@/api";
import { toast } from "sonner";
import { useAddtoCart, useCart } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";

export default function Cart() {
  const { cartItems, getTotalPrice } = useCart();
  const totalPrice = getTotalPrice();
  const queryClient = useQueryClient()
  const addProductToCart = useAddtoCart()
  const navigate = useNavigate()


  const removeItem = useMutation({
    mutationFn: (id: string) => removeItemFromCart(id),
    onSuccess: () => {
      toast.success('Product removed from cart successfully.')
      queryClient.invalidateQueries({ queryKey: ['carts'] });
    }
  })

  const decreaseItem = useMutation({
    mutationFn: (id: string) => decreaseItemFromCart(id),
    onSuccess: () => {
      toast.success('Cart updated successfully.')
      queryClient.invalidateQueries({ queryKey: ['carts'] });
    }
  })

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-pink-500 mb-6">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-700">
          Your cart is empty. Add some products first!
        </p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border-b border-gray-200 pb-2"
            >
              <div>
                <Link to={`/products/${item?.product?._id}/detail`} className="hover:text-primary hover:underline">
                  <h2 className="font-semibold">{item?.product?.name}</h2>
                </Link>
                <p className="text-gray-600">${item?.product?.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseItem.mutate(item?.product?._id)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{item?.quantity}</span>
                <button
                  onClick={() => addProductToCart.mutate({ productId: item?.product?._id, quantity: 1 })}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem.mutate(item?.product?._id)}
                  className="ml-4 text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-4 font-semibold text-gray-800">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <Button className="w-full mt-4 bg-pink-500 text-white py-2 rounded hover:bg-pink-600" onClick={() => {
            navigate('/shiping')
          }}>
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );
}
