import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div
      className="w-[250px] bg-gray-100"
      onClick={() => navigate(`/product/${product?._id}`)}
    >
      <Slider {...settings}>
        {product?.images?.map((image, index) => (
          <div key={index}>
            <img src={image.url} alt={product.name} />
          </div>
        ))}
      </Slider>
      <br></br>
      <div className="text-xl px3 text-center">{product?.name}</div>
      <div className="text-2xl px3 text-center">£{product?.price}</div>
    </div>
  );
};

export default ProductCard;
