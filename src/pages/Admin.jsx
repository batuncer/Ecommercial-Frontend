import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../redux/productSlice";
import { MdEdit } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { Modal } from "../components/modal";
import { openModalFunc } from "../redux/generalSlice";
import Input from "../components/Input";

export const Admin = () => {
    const dispatch = useDispatch();
    const { openModal } = useSelector(state => state.general);
    const { adminProducts } = useSelector(state => state.products);
    const [data, setData] = useState({ name: "", description: "", price: null, stock: null, category: "", images: [] })

    useEffect(() => {
        dispatch(getAdminProducts());
    }, [dispatch]);

    const addProduct = () => {
        dispatch(openModalFunc());
    };

    const productHandle = (e) => {
        if (e.target.name === "images") {
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        }
    }

    const content = (
        <div className="my-3">
            <Input onChange={productHandle} name={"name"} id={"productName"} placeholder={"Product Name"} type={"text"} value={data.name} />
            <Input onChange={productHandle} name={"description"} id={"productDescription"} placeholder={"Description"} type={"text"} value={data.description} />
            <Input onChange={productHandle} name={"price"} id={"productPrice"} placeholder={"Price"} type={"text"} value={data.price} />
            <Input onChange={productHandle} name={"stock"} id={"productStock"} placeholder={"Stock"} type={"text"} value={data.stock} />
            <Input onChange={productHandle} name={"category"} id={"productCategory"} placeholder={"Category"} type={"text"} value={data.category} />
            <Input onChange={productHandle} name={"images"} id={"productImages"} placeholder={"Image"} type={"file"} value={data.images} />
        </div>
    );

    return (
        <div className="mx-[10rem] min-h-screen">
            <button onClick={addProduct} className="my-20 mx-[10rem] w-[1000px] h-12 flex items-center justify-center rounded-md bg-red-500 text-white">Add a product</button>
            <div>
                {
                    adminProducts?.map((item, i) => (
                        <div className="flex items-center justify-between border-b mb-2 py-2 px-4" key={i}>
                            <img className="w-20" src={item.images[0].url} alt="photo" />
                            <div className="text-xl">{item.name}</div>
                            <div className="mx-[10rem]  flex justify-between mb-2 py-2 px-4">
                                <MdEdit size={24} className="mr-4" />
                                <RiDeleteBinFill size={24} className="mr-4" />
                            </div>
                        </div>
                    ))
                }
            </div>
            {openModal && <Modal title={"Add a product"} onClick={() => { }} content={content} btnName="add" />}
        </div>
    );
};