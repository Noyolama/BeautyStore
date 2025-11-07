import Carousel from "../components/Carousel";

export default function Home() {
  return (
    <main className="p-4 bg-gray-100">
      <section className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to our Skincare Store</h1>
        <p className="mb-6">Discover the best skincare products for your skin type and concerns.</p>
        <img src="/images/Skincare/1111img3.jpg" alt="Skincare" className="mx-auto mb-1 h-50 w-50 rounded" />
        <Carousel />
      </section>
    </main>
  );
}
