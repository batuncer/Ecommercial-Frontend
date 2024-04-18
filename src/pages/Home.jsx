import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";

const Home = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])
    return (
        <>
            <div className="flex items-center justify-center gap-5 my-10 h-auto">
                <img
                    src="https://static.vecteezy.com/system/resources/previews/001/829/864/original/25-off-big-sale-poster-for-e-commerce-girl-riding-trolley-and-happy-shopping-character-concept-illustration-for-web-landing-page-banner-mobile-apps-card-book-illustration-free-vector.jpg"
                    alt=""
                    style={{ width: '1500px', height: 'auto' }}
                />
            </div>

            {
                loading ? "Loading..." : <div>
                    {
                        products && <div className="flex items-center justify-center gap-5 my-5 flex-wrap">
                            {
                                products.map((product, i) => (
                                    <ProductCard product={product} key={i} />
                                ))
                            }
                        </div>
                    }
                </div >
            }
        </>
    )
}

export default Home;
