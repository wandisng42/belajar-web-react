import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetailProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [qty, setQty] = useState(1);
  const handleQuantityChange = (productId, newQty) => {
    if (newQty > 0) {
      setQty(newQty);
    }
  };

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-500 text-white px-3 py-1 rounded"
      >
        Back
      </button>

      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>

      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-64 rounded mb-4"
      />

      <p className="mb-2">{product.description}</p>
      <p>💰 Price: ${product.price}</p>
      <p>⭐ Rating: {product.rating}</p>
      <p>📦 Stock: {product.stock}</p>
      <p>🏷 Brand: {product.brand}</p>
      <p>📂 Category: {product.category}</p>

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleQuantityChange(product.id, qty - 1);
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
        >
          -
        </button>
        <span className="text-black font-bold text-lg w-8 text-center">
          {qty}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleQuantityChange(product.id, qty + 1);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
        >
          +
        </button>
      </div>

      <p className="mt-2 font-semibold text-red-500">
        Total: ${(product.price * qty).toFixed(2)}
      </p>
    </div>
  );
};

export default DetailProduct;
