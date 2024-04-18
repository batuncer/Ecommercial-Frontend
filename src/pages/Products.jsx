import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';
import { Filter } from '../layout/Filter';
import ReactPaginate from 'react-paginate';

export function Products() {
    const dispatch = useDispatch();
    const { products, loading } = useSelector(state => state.products);
    const { keyword } = useSelector((state) => state.general)
    const [price, setPrice] = useState({ min: 0, max: 30000 })
    const [rate, setRate] = useState(0)
    const [category, setCategory] = useState("")
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + 4;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / 4);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 4) % products.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    useEffect(() => {
        dispatch(getProducts({ keyword, price, rate, category }))
    }, [dispatch, keyword, price, rate, category])
    return (
        <div className='min-h-screen' >
            <div className='flex gap-3'>
                <Filter setPrice={setPrice} setRate={setRate} setCategory={setCategory} />
                <div>
                    {
                        loading ? "Loading..." : <div>
                            {
                                products && <div className="flex items-center justify-center gap-5 my-5 flex-wrap">
                                    {
                                        currentItems.map((product, i) => (
                                            <ProductCard product={product} key={i} />
                                        ))
                                    }
                                </div>
                            }
                        </div >
                    }
                    <div className="flex justify-between mt-4">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="< previous"
                            renderOnZeroPageCount={null}
                        />
                    </div>
                </div>
            </div>


        </div>

    )
}