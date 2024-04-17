import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../redux/productSlice";
import { useParams } from "react-router-dom";
import Slider from "react-slick";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product } = useSelector(state => state.products);

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
        <div className="">
          <div className="flex">
            {product && (
              <div className="w-[250px] bg-gray-100">
                <Slider {...settings}>
                  {product?.images?.map((image, index) => (
                    <div key={index}>
                      <img src={image.url} alt={product.name} />
                    </div>
                  ))}
                </Slider>
                <div>{product.name}</div>
                <div>{product.price}</div>
                <div>{product.stock}</div>
                <div>{product.description}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
