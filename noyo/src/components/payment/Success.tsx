import { useLocation, useNavigate } from "react-router-dom";
import { base64Decode } from "@/utils";
import { useEffect } from "react";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const token = queryParams.get("data");
    const decoded = token ? base64Decode(token) : null;
    const order_id =
      decoded?.transaction_uuid || queryParams.get("purchase_order_id") || sessionStorage.getItem("current_transaction_id");

    if (order_id) {
      // Example order_id: id-6910bafa42d7692227ba47b7-1762710203762
      const [, orderId] = order_id.split("-");
      console.log("Navigating to order:", orderId);

      navigate(`/orders/${orderId}/detail`);
    }
  }, [location, navigate]);

    return (
        <div>
            <h2>Processing your order...</h2>
        </div>
    );

};

export default Success;