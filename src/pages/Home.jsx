import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";

const Home = () => {
    const dispatch = useDispatch();
    const { products, totalPages } = useSelector((state) => state.products);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getProducts(currentPage));
    }, [dispatch, currentPage]);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1)
    };

    return (
        <div className="mx-[10rem]" >
            <div className="flex items-center justify-center gap-5 my-10 h-auto">
                <img
                    src="https://static.vecteezy.com/system/resources/previews/001/829/864/original/25-off-big-sale-poster-for-e-commerce-girl-riding-trolley-and-happy-shopping-character-concept-illustration-for-web-landing-page-banner-mobile-apps-card-book-illustration-free-vector.jpg"
                    alt=""
                    style={{ width: '1500px', height: 'auto' }}
                />
            </div>
            <div style={{ fontSize: '2rem', color: 'white', fontWeight: 'bold', textAlign: 'center', margin: "10px", backgroundColor: 'rgb(148 163 184)' }}>
                PRODUCTS
            </div>
            {products && (
                <div >

                    <ProductCard products={products} />

                </div>
            )}
            <div className="flex justify-center my-5">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="mr-3 px-4 py-2 bg-gray-200"
                >
                    Prev
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Home;
