import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import StyleDataUser from "./componend/carst data-user";

// Loading Component dengan Animasi
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="relative w-20 h-20">
        {/* Spinner utama */}
        <motion.div
          className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-blue-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1000, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner spinner */}
        <motion.div
          className="absolute inset-2 border-4 border-transparent border-b-green-500 border-l-green-500 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1000, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}

export default function DataUser() {
  const navigate = useNavigate();

  const [carts, setCarts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/carts");
      setCarts(response.data.carts);

      // Initialize quantities
      const initialQuantities = {};
      response.data.carts.forEach((cart) => {
        cart.products.forEach((product) => {
          initialQuantities[product.id] = product.quantity;
        });
      });
      setQuantities(initialQuantities);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      setQuantities((prev) => ({
        ...prev,
        [productId]: newQuantity,
      }));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-screen min-h-screen bg-white-900 p-6 flex flex-col items-center justify-start">
          <h1 className="text-3xl font-bold mb-4 text-center text-black-900">
            Data Carts
          </h1>
          <button
            onClick={() => navigate("/")}
            className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Back to data user
          </button>
          <p className="text-black-100 text-center mb-4">
            This page will display cart data.lllllllll
          </p>

          <StyleDataUser
            carts={carts}
            quantities={quantities}
            handleQuantityChange={handleQuantityChange}
          />
        </div>
      )}
    </>
  );
}
