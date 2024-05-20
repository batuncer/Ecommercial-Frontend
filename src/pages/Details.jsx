import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../redux/productSlice";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import { Button } from "../components/Button";
import { addToCart } from "../redux/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product } = useSelector(state => state.products);
  const [quantity, setQuantity] = useState(1)
  const addBasket = () => {
    const data = {
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0]['url'],
      quantity: quantity,
    }
    dispatch(addToCart(data))

  }


  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }
  const increment = () => {
    if (quantity < product?.stock) {
      setQuantity(quantity + 1);
    }
  }


  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  console.log(product)

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div className="min-h-screen">
          <div className="flex mt-4 justify-center gap-5">
            {product && (
              <div className="w-[700px]">
                <Slider {...settings}>
                  {product?.images?.map((image, index) => (
                    <div key={index}>
                      <img src={image.url} alt={product.name} />
                    </div>
                  ))}
                </Slider>

              </div>
            )}
            <div className="w-[600px] pt-24 space-y-3 ml-4">
              <div className="text-2xl">{product.name}</div>
              <div >Price: £{product.price}</div>
              <div>Stock: {product.stock}</div>
              <div className="mb-4 flex items-center gap-3">Rating: {product.rating}<FaStar /></div>
              <div className="flex items-center gap-4">
                <div className="text-3xl cursor-pointer " onClick={decrement}>-</div>
                <div>{quantity}</div>
                <div className="text-3xl cursor-pointer " onClick={increment}>+</div>
              </div>
              <Button name={"Add to Basket"} onClick={addBasket} />
              <h3 className="mb-4 text-2xl">Description:</h3>
              <div >{product.description}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
