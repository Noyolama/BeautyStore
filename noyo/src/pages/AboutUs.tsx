export default function About() {
  return (
    <main className="flex-grow px-6 py-16 bg-gray-100 text-black">
      <section className="max-w-5xl mx-auto mb-16">
        <h2 className="text-3xl font-serif mb-6 text-center text-pink-500">About Us</h2>
        <p className="text-lg text-center mb-10">
         We bring you the best products from top skincare, haircare, and beauty brands, all in one place.
        </p>

        {/* Grid for features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-medium mb-3 text-black">Top Brands</h3>
            <p>
              We carefully select products from leading beauty brands to ensure quality and reliability.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-medium mb-3 text-black">Wide Selection</h3>
            <p>
              Our store offers a variety of products for all skin types, concerns, and beauty preferences.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-medium mb-3 text-black">Easy Shopping</h3>
            <p>
              Convenient browsing, simple checkout, and secure payment options make shopping effortless.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto text-center">
        <p className="text-black text-lg mb-8">
          Our goal is to make your beauty shopping experience simple, enjoyable, and reliable. We constantly update our collection to bring you the latest and most popular products from trusted brands.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-medium mb-3 text-black">Customer Satisfaction</h3>
            <p>
              We are dedicated to providing excellent customer service and support for all your beauty needs.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-medium mb-3 text-black">Authentic Products</h3>
            <p>
              All products sold in our store are 100% authentic and sourced directly from brands or authorized distributors.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-medium mb-3 text-black">Fast Delivery</h3>
            <p>
              We provide fast and reliable delivery so you can enjoy your favorite beauty products as soon as possible.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

