import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <div key={product.id} className="group bg-gray-200 rounded-lg" onClick={() => navigate(`/product/${product._id}`)}>
            <div className="rounded-bt bg-gray-500 ">
              <img src={product.images[0]['url']} alt={product.name} className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900 text-end">£{product.price}</p>
          </div>

        ))}
      </div>
    </div>
  );
};

export default ProductCard;
