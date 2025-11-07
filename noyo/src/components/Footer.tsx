import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white p-4 relative text-black border-t">
      <div className="max-w-4xl mx-auto px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Link Info */}
        <div>
          <h3 className="font-bold mb-1 uppercase text-sm">Link Info</h3>
          <ul className="space-y-1 text-black text-sm">
            <li>Skin Care</li>
            <li>Makeup</li>
            <li>New Product</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-bold mb-1 uppercase text-sm">Support</h3>
          <ul className="space-y-1 text-black text-sm">
               <li>
                   <Link to="/contact" className="hover:underline">Contact Us</Link>
                </li>
                <li>
                   <Link to="/terms-condition" className="hover:underline">Terms & Condition</Link>
                </li>
                <li>
                   <Link to="/privacy-policy" className="hover:underline">Privacy & Policy</Link>
                </li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="font-bold mb-1 uppercase text-sm">About</h3>
          <ul className="space-y-1 text-black text-sm">
            <li>
              <Link to="/team" className="hover:underline">Team</Link>
            </li>
            <li>
              <Link to="/delivery-and-returns" className="hover:underline">
                Delivery And Returns
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:underline">FAQ</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center bg-white py-2 text-sm font-semibold text-gray-700">
        <p>&copy; {new Date().getFullYear()} Online Beauty Store. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
