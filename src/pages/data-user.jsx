import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import StyleDataUser from "./component/style-data-user";

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <motion.div
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export default function DataUser() {
  const navigate = useNavigate();

  const [carts, setCarts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);

      // Ambil data carts standar
      const cartsResponse = await axios.get("https://dummyjson.com/carts");
      const originalCarts = cartsResponse.data.carts || [];

      // Ambil produk ekstra untuk menampilkan di UI
      const extraRes = await fetch(
        "https://dummyjson.com/products?limit=10&skip=10&select=title,price",
      );
      const extraData = await extraRes.json();

      const extraCart = [
        {
          id: "extra-products",
          userId: "extra",
          products: (extraData.products || []).map((product) => ({
            ...product,
            quantity: 1,
            thumbnail: product.thumbnail || "",
          })),
        },
      ];

      // Gabungkan carts lama + extra
      const mergedCarts = [...originalCarts, ...extraCart];
      setCarts(mergedCarts);

      // Inisialisasi quantity gabungan
      const initialQuantities = {};
      mergedCarts.forEach((cart) => {
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

  // SEARCH
  const handleSearch = async () => {
    if (!search.trim()) {
      fetchUsers();
      return;
    }

    try {
      setLoading(true);

      const response = await axios.get(
        `https://dummyjson.com/products/search?q=${search}`,
      );

      const fakeCart = [
        {
          id: "search",
          userId: "search",
          products: response.data.products.map((product) => ({
            ...product,
            quantity: 1,
          })),
        },
      ];

      setCarts(fakeCart);

      // reset quantity untuk search
      const newQuantities = {};
      response.data.products.forEach((product) => {
        newQuantities[product.id] = 1;
      });

      setQuantities(newQuantities);
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
        <div className="w-screen min-h-screen p-6 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4">Data Carts</h1>

          {/* SEARCH */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-3 py-2 rounded"
            />

            <button
              onClick={handleSearch}
              className="bg-white text-blue px-4 py-2 rounded"
            >
              Search
            </button>

            <button
              onClick={fetchUsers}
              className="bg-white text-blue px-4 py-2 rounded"
            >
              Reset
            </button>
          </div>

          <StyleDataUser
            carts={carts}
            quantities={quantities}
            handleQuantityChange={handleQuantityChange}
            handleView={(userId) => {
              navigate(`/detail-carts/${userId}`);
            }}
            handleProductClick={(productId) => {
              navigate(`/detail-product/${productId}`);
            }}
          />
        </div>
      )}
    </>
  );
}
