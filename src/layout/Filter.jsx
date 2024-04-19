import React from "react";

export function Filter({ setPrice, setRate, setCategory }) {

    const categoryList = [
        "Electronic", "Shoes", "Furniture", "Clothes", "Books", "Glasses", "Phone"
    ]
    const ratingList = [
        1, 2, 3, 4, 5
    ]
    return (

        <div className="w-[200px] mt-3 p-1">
            <div className="text-2xl">Filter</div>
            <div className="flex items-center gap-2 my-2">
                <input onChange={e => setPrice(prev => ({ ...prev, min: e.target.value }))} className="border w-16 p-1 outline-none text-sm cursor-pointer" type="number" placeholder="Min" />
                <input onChange={e => setPrice(prev => ({ ...prev, max: e.target.value }))} className="border w-16 p-1 outline-none text-sm cursor-pointer" type="number" placeholder="Max" />
            </div>
            <div className="my-2 text-xl">Category</div>
            {
                categoryList.map((category, i) => (
                    <div className="text-sm text-sm cursor-pointer" onClick={() => setCategory(category)} key={i}>{category}</div>
                ))
            }
            <hr />
            <div className="my-2 text-xl">Rating</div>
            {
                ratingList.map((rating, i) => (
                    <div onClick={() => setRate(rating)} className="text-sm cursor-pointer" key={i}>{rating}</div>
                ))
            }
        </div>
    )
}