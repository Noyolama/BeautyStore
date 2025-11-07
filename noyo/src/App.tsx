import Home from "./pages/Home";
import About from "./pages/AboutUs";
import Auth from "./pages/Auth";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import DeliveryAndReturns from "./pages/DeliveryAndReturns";
import TermsAndConditions from "./pages/TermsAndCondition";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQ from "./pages/FAQ";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import SearchPage from "./pages/SearchPage";
import { AdminProtectedRoute } from "@/lib/auth/AdminProtectedRoute";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import AdminProducts from "./pages/admin/products";
import AdminLayout from "./components/layouts/AdminLayout";
import PublicLayout from "./components/layouts/PublicLayout";
import Dashboard from "./pages/admin";
import CreateProduct from "@/pages/admin/products/CreateProduct";
import NotFound from "./pages/NotFound";
import EditProduct from "./pages/admin/products/EditProduct";
import PublicProducts from "./pages/products";
import Test from "./pages/Test";
import { ProtectedRoute } from "./lib/auth/ProtectedRoute";
import Shiping from "./pages/Shiping";
import AdminOrders from "./pages/admin/orders";
import ProductDetail from "./pages/products/ProductDetail";
import AdminOrderDetail from "./pages/admin/orders/OrderDetail";
import Forbidden from "./pages/Forbidden";
import MyOrders from "./pages/MyOrders";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/team" element={<Team />} />
          <Route path="/delivery-and-returns" element={<DeliveryAndReturns />} />
          <Route path="/terms-condition" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/test" element={<Test />} />
          <Route path="/products" element={<PublicProducts />} />
          <Route path="/products/:productId/detail" element={<ProductDetail />} />
          <Route path="/orders" element={<MyOrders />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/shiping" element={<Shiping />} />
          </Route>

        <Route path='/403' element={<Forbidden />} />
        </Route>


        {/* Admin pages */}
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />} >
            <Route index element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/create" element={<CreateProduct />} />
            <Route path="products/:id/edit" element={<EditProduct />} />

            <Route path="orders" element={<AdminOrders />} />
            <Route path="orders/:orderId/detail" element={<AdminOrderDetail />} />
          </Route>
        </Route>
        {/* Admin pages */}

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
