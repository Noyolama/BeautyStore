import { useQuery } from "@tanstack/react-query";
import Carousel from "../components/Carousel";
import { fetchNewProducts, getAllCategory } from "@/api";
import { ProductListCard } from "./products/_components/ProductListCard";
import { Link } from "react-router";
import { MoveRight } from "lucide-react";
import { useAuth } from "@/hooks";
import { fetchRecommendationsBasedOnUser } from "@/api/recommendations";

export default function Home() {
  const { currentUser } = useAuth()
  const { data: recommendedProducts } = useQuery({
    queryKey: ['recommended-list'],
    queryFn: () => fetchRecommendationsBasedOnUser(),
    enabled: !currentUser,
    refetchOnWindowFocus: false, // don't refetch on tab change
    refetchOnReconnect: false,   // don't refetch on reconnect
    retry: false,
  })
  const { data: newProducts } = useQuery({
    queryKey: ['new-launches'],
    queryFn: () => fetchNewProducts(),
    refetchOnWindowFocus: false, // don't refetch on tab change
    refetchOnReconnect: false,   // don't refetch on reconnect
    retry: false,
  })

  const { data: categories } = useQuery({
    queryKey: ['home-categories'],
    queryFn: () => getAllCategory(),
  })
  return (
    <main className="p-4 bg-gray-100">
      <section className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to our Skincare Store</h1>
        <p className="mb-6">Discover the best skincare products for your skin type and concerns.</p>
        <img src="/images/Skincare/1111img3.jpg" alt="Skincare" className="mx-auto mb-1 h-50 w-50 rounded" />
        <Carousel />
      </section>
      <div className="my-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6">
          {categories?.map((c, index) => (
            <Link
              to={`/products?category=${c?._id}`}
              key={index}
              className="
              group relative overflow-hidden
              rounded-2xl shadow-sm
              bg-white border border-gray-200
              hover:border-transparent hover:shadow-xl
              transition-all duration-300 ease-out
              flex flex-col items-center justify-center
              px-6 py-8 cursor-pointer
              "
            >
              {/* Decorative gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>

              {/* Category Content */}
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Optional icon/image placeholder */}
                <div className="w-14 h-14 mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                  <span className="text-primary text-xl font-semibold">
                    {c?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>

                <h3 className="text-gray-800 font-semibold text-lg group-hover:text-primary transition-colors duration-300 ease-in-out">
                  {c?.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>


      </div>
      {
        currentUser && (
          <div className="my-16">
            <div className="flex justify-between mb-2">
              <h1 className="text-3xl font-semibold">Recommended for you</h1>
              <Link to={'/products'} className="flex gap-2 items-center hover:underline hover:text-primary text-small">Explore More <MoveRight size={15} /></Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {
                recommendedProducts && recommendedProducts?.map((p: Product, index: number) => (
                  <ProductListCard key={index} product={p} />
                ))
              }
            </div>
          </div>
        )
      }

      <div>
        <div className="flex justify-between mb-2">
          <h1 className="text-3xl font-semibold">New Launches</h1>
          <Link to={'/products'} className="flex gap-2 items-center hover:underline hover:text-primary text-small">Explore More <MoveRight size={15} /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {
            newProducts && newProducts?.map((p: Product, index: number) => (
              <ProductListCard key={index} product={p} />
            ))
          }
        </div>
      </div>
    </main>
  );
}
