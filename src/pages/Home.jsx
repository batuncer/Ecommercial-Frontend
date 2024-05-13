import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";
import Slider from "react-slick";

const Home = () => {
    const dispatch = useDispatch();
    const { products, totalPages, loading } = useSelector((state) => state.products);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getProducts(currentPage));
    }, [dispatch, currentPage]);


    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight &&
            !loading &&
            currentPage < totalPages
        ) {
            setCurrentPage(currentPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [currentPage, loading]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="mx-[10rem]" >
            <div className="my-10">
                <Slider {...settings}>
                    <div>
                        <img
                            src="https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg"
                            alt=""
                            style={{ borderRadius: "20px", width: '100%', height: '400px' }}
                        />
                    </div>
                    <div>
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/001/829/864/original/25-off-big-sale-poster-for-e-commerce-girl-riding-trolley-and-happy-shopping-character-concept-illustration-for-web-landing-page-banner-mobile-apps-card-book-illustration-free-vector.jpg"
                            alt=""
                            style={{ borderRadius: "20px", width: '100%', height: '400px' }}
                        />
                    </div>
                    <div>
                        <img
                            src="https://t4.ftcdn.net/jpg/03/20/46/13/360_F_320461388_5Snqf6f2tRIqiWlaIzNWrCUm1Ocaqhfm.jpg"
                            alt=""
                            style={{ borderRadius: "20px", width: '100%', height: '400px' }}
                        />
                    </div>


                </Slider>
            </div>
            <div style={{ fontSize: '2rem', color: 'white', fontWeight: 'bold', textAlign: 'center', margin: "10px", backgroundColor: '#fb8c00' }}>
                PRODUCTS
            </div>
            {products && (
                <div >

                    <ProductCard products={products} />

                </div>
            )}

        </div>
    );
};

export default Home;
