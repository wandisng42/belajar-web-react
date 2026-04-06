import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StyleDataUser from "./component/style-data-user";

export default function DetailCards() {
  const { userid } = useParams();
  const navigate = useNavigate();

  const [carts, setCarts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/carts/user/${userid}`,
      );

      setCarts(response.data.carts);

      const initialQty = {};
      response.data.carts.forEach((cart) => {
        cart.products.forEach((product) => {
          initialQty[product.id] = product.quantity;
        });
      });

      setQuantities(initialQty);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [userid]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      setQuantities((prev) => ({
        ...prev,
        [productId]: newQuantity,
      }));
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="w-screen min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Detail Carts User {userid}</h1>

      <button
        onClick={() => navigate("/")}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Back
      </button>

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
  );
}
