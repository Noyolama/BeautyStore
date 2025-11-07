import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("All fields are required!");
      return;
    }

    alert(`Thank you for reaching out, ${formData.name}. Your message has been sent!`);

    // reset form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-2 bg-gray-100 p-6">

      {/* Contact Section */}
      <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg mt-8 p-8">
        <h2 className="text-3xl font-serif text-pink-500 text-center mb-8">
          Contact Us
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-start justify-between md:gap-16">
          {/* Contact Form */}
          <div>
            <h3 className="text-xl font-serif text-black mb-4">Get in Touch</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Your Full Name"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Your Email Address"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Your Message"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-semibold text-black mb-4">Our Contact Information</h3>
            <p className="mb-2"><strong>Email:</strong>onlinebeautystore33@gmail.com</p>
            <p className="mb-2"><strong>Phone:</strong> 9822826345</p>

          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
