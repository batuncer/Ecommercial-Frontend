import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsSearch } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';
import { Filter } from '../layout/Filter';
import { CircularPagination } from '../components/Pagination';

export function Products() {
    const dispatch = useDispatch();
    const { products, loading } = useSelector(state => state.products);
    const { keyword } = useSelector((state) => state.general)
    const [price, setPrice] = useState({ min: 0, max: 30000 })
    const [rate, setRate] = useState(0)
    const [category, setCategory] = useState("")
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + 5;
    const currentItems = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / 5);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 5) % products.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        dispatch(getProductsSearch({ keyword, price, rate, category }))
    }, [dispatch, keyword, price, rate, category])

    return (
        <div className='min-h-screen'>
            <div className='flex'>
                <div>
                    <Filter setPrice={setPrice} setRate={setRate} setCategory={setCategory} />
                </div>
                <div className='flex items-center justify-center flex-grow'>
                    {loading ? "Loading..." : (
                        <div>
                            {products && (
                                <div className="flex items-center justify-center gap-5 my-5 flex-wrap">
                                    {currentItems.map((product, i) => (
                                        <ProductCard product={product} key={i} />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <CircularPagination pageCount={pageCount} handlePageClick={handlePageClick} />
            </div>
        </div>
    )
}
