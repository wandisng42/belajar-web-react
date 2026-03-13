import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

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
          <p className="text-black-100 text-center mb-4">
            This page will display cart data.
          </p>
          <div className="mt-4 w-full max-w-2xl">
            {carts.map((cart) => (
              <div
                key={cart.id}
                className="border p-4 rounded mb-4 bg-black-800"
              >
                <h2 className="text-xl font-semibold mb-2 text-white">
                  Cart ID: {cart.id}
                </h2>
                <ul>
                  {cart.products.map((product) => (
                    <li
                      key={product.id}
                      className="border p-4 rounded mb-2 bg-alice to-blue-100-700"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-bold text-white">
                            {product.title}
                          </p>
                          <p className="text-gray-200">
                            Price: ${product.price}
                          </p>
                          <p className="text-gray-200">
                            Discount: {product.discountPercentage}%
                          </p>
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-16 h-16 mt-2"
                          />
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  product.id,
                                  quantities[product.id] - 1,
                                )
                              }
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                            >
                              -
                            </button>
                            <span className="text-white font-bold text-lg w-8 text-center">
                              {quantities[product.id] || product.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  product.id,
                                  quantities[product.id] + 1,
                                )
                              }
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                            >
                              +
                            </button>
                          </div>
                          <p className="text-gray-200 text-sm">
                            Total: $
                            {(
                              product.price *
                              (quantities[product.id] || product.quantity)
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
