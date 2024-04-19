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
    <div className='w-[250px] bg-gray-100'>
      <Slider {...settings}>
        {product?.images?.map((image, index) => (
          <div key={index} onClick={() => navigate(`/product/${product._id}`)}>
            <img src={image.url} alt={product.name} />
            <div >{product.name}</div>
            <div className="text-end">£{product.price}</div>
          </div>

        ))}
      </Slider>

    </div>
  );
};

export default ProductCard;
