export default function DeliveryAndReturns() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-serif text-center mb-12 text-pink-500">
        Delivery & Returns
      </h1>

      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-8 text-gray-700">

        {/* 1. Delivery Information */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Delivery Information</h2>
          <p>
            Orders are typically processed within <strong>1–2 business days</strong> after
            confirmation. Estimated delivery time is <strong>3–7 business days</strong>,
            depending on the shipping address and courier availability.
          </p>
          <p className="mt-2">
            Once shipped, customers will receive an email with tracking details.
          </p>
        </section>

        {/* 2. Shipping Charges */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">2. Shipping Charges</h2>
          <p>
            Standard shipping charges may apply based on location and order size.
            Free delivery may be available on promotional offers or minimum order
            thresholds.
          </p>
        </section>

        {/* 3. Returns Policy */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">3. Returns Policy</h2>
          <p>
            If you are not satisfied with your purchase, items may be returned within{" "}
            <strong>7 days of delivery</strong>, provided they are unused,
            unopened, and in original packaging.
          </p>
          <p className="mt-2">
            Customers are responsible for return shipping unless the product is
            defective or incorrect.
          </p>
        </section>

        {/* 4. Refunds */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">4. Refunds</h2>
          <p>
            Once your return is received and inspected, we will notify you of
            the approval or rejection of your refund. Approved refunds will be
            processed within <strong>5–10 business days</strong> to your
            original payment method.
          </p>
        </section>

        {/* 5. Exceptions */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">5. Exceptions</h2>
          <p>
            Certain items are non-returnable for hygiene and safety reasons,
            such as opened skincare, beauty products, or personalized items.
          </p>
        </section>

        {/* 6. Contact Us */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">6. Contact Us</h2>
          <p>
            For questions regarding delivery or returns, contact us at:
          </p>
          <ul className="list-none mt-2 space-y-1">
            <li><strong>Email:</strong> onlinebeautystore33@gmail.com</li>
            <li><strong>Phone:</strong> +977-9822826345</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
