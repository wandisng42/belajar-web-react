export default function StyleDataUser({
  carts,
  quantities,
  handleQuantityChange,
}) {
  return (
    <div className="mt-4 w-full max-w-2xl">
      {carts.map((cart) => (
        <div key={cart.id} className="border p-4 rounded mb-4 bg-black-800">
          <h2 className="text-xl font-semibold mb-2 text-black-900">
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
                    <p className="font-bold text-black-900">{product.title}</p>
                    <p className="text-black-200">Price: ${product.price}</p>
                    <p className="text-black-200">
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
                        className="bg-red-600 hover:bg-red-700 text-black-900 px-3 py-1 rounded"
                      >
                        -
                      </button>
                      <span className="text-black-900 font-bold text-lg w-8 text-center">
                        {quantities[product.id] || product.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            product.id,
                            quantities[product.id] + 1,
                          )
                        }
                        className="bg-green-600 hover:bg-green-700 text-black-900 px-3 py-1 rounded"
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
  );
}
