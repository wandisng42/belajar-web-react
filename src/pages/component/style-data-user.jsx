export default function StyleDataUser({
  carts,
  quantities,
  handleQuantityChange,
  handleView,
}) {
  return (
    <div className="mt-4 w-full max-w-2xl">
      {carts.map((cart) => (
        <div key={cart.id} className="border p-4 rounded mb-4 bg-red-800">
          <h2 className="text-xl font-semibold mb-2 text-white">
            Cart ID: {cart.id}
          </h2>

          {/* tombol view */}
          <button
            onClick={() => handleView(cart.userId)}
            detail={cart.userId}
            className="bg-blue-500 hover:bg-blue-600 text-black px-3 py-1 rounded mb-3"
          >
            View Detail
          </button>

          <ul>
            {cart.products.map((product) => {
              const qty = quantities[product.id] || product.quantity;

              return (
                <li
                  key={product.id}
                  className="border p-4 rounded mb-2 bg-green-700"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-bold text-black">{product.title}</p>
                      <p className="text-red-300">Price: ${product.price}</p>
                      <p className="text-black-300">
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
                            handleQuantityChange(product.id, qty - 1)
                          }
                          className="bg-red-600 hover:bg-red-700 text-black px-3 py-1 rounded"
                        >
                          -
                        </button>

                        <span className="text-white font-bold text-lg w-8 text-center">
                          {qty}
                        </span>

                        <button
                          onClick={() =>
                            handleQuantityChange(product.id, qty + 1)
                          }
                          className="bg-black-600 hover:bg-black-700 text-black px-3 py-1 rounded"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-red-300 text-sm">
                        Total: ${(product.price * qty).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
