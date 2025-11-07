export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-serif text-center mb-12 text-pink-500">
        Terms & Conditions
      </h1>

      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-lg space-y-6 text-black">
        
        {/* 1. Acceptance of Terms */}
        <section>
          <h2 className="text-xl font-medium mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing and using this website, you agree to comply with these Terms & Conditions. 
            If you do not agree, please discontinue using our services immediately.
          </p>
        </section>

        {/* 2. Use of Website */}
        <section>
          <h2 className="text-xl font-medium mb-3">2. Use of Website</h2>
          <p>
            This website is provided for personal, non-commercial use. You agree not to misuse 
            the content, interfere with functionality, or attempt unauthorized access.
          </p>
        </section>

        {/* 3. Accounts & Registration */}
        <section>
          <h2 className="text-xl font-medium mb-3">3. Accounts & Registration</h2>
          <p>
            When creating an account, you agree to provide accurate and complete information. 
            You are responsible for maintaining the confidentiality of your login credentials.
          </p>
        </section>

        {/* 4. Purchases & Payments */}
        <section>
          <h2 className="text-xl font-medium mb-3">4. Purchases & Payments</h2>
          <p>
            All purchases made through this website are subject to product availability and 
            confirmation of payment. Prices are displayed in local currency and may be updated without notice.
          </p>
        </section>

        {/* 5. Intellectual Property */}
        <section>
          <h2 className="text-xl font-medium mb-3">5. Intellectual Property</h2>
          <p>
            All content, including images, text, graphics, and code, is the property of this 
            project and is protected by applicable intellectual property laws. Unauthorized use 
            is prohibited.
          </p>
        </section>

        {/* 6. Limitation of Liability */}
        <section>
          <h2 className="text-xl font-medium mb-3">6. Limitation of Liability</h2>
          <p>
            This website is part of a college project. We are not liable for any damages, losses, 
            or issues arising from the use of this site or reliance on its content.
          </p>
        </section>

        {/* 7. Changes to Terms */}
        <section>
          <h2 className="text-xl font-medium mb-3">7. Changes to Terms</h2>
          <p>
            We may update these Terms & Conditions at any time. Continued use of the website 
            after changes are posted constitutes acceptance of the updated terms.
          </p>
        </section>

        {/* 8. Contact Us */}
        <section>
          <h2 className="text-xl font-medium mb-3">8. Contact Us</h2>
          <p>
            If you have any questions about these Terms & Conditions, please contact us at:
          </p>
          <ul className="list-none ml-0 mt-2 space-y-1">
            <li><strong>Email:</strong> onlinebeautystore33@gmail.com</li>
            <li><strong>Phone:</strong> +977-9822826345</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
