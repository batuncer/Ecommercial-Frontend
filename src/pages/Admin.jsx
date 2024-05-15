import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, getAdminProducts } from "../redux/productSlice";
import { MdEdit } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { Modal } from "../components/modal";
import { openModalFunc } from "../redux/generalSlice";
import Input from "../components/Input";
import axios from "axios";
import { config } from "../config";

export const Admin = () => {
    const dispatch = useDispatch();
    const { openModal } = useSelector(state => state.general);
    const { adminProducts } = useSelector(state => state.products);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
    });

    const [image, setImage] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(getAdminProducts());
    }, [dispatch]);

    const addProduct = () => {
        dispatch(openModalFunc());
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        transformFile(file)
    };

    const transformFile = (file) => {
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImage(reader.result)
            }
        }
        else {
            setImage(null)
        };
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(createProduct({
            name: formData.name,
            description: formData.description,
            price: formData.price,
            stock: formData.stock,
            category: formData.category,
            images: image
        }))
    };

    const handleDelete = async (productId) => {
        try {
            const response = await axios.delete(`/products/${productId}`);

            dispatch(getAdminProducts());
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const content = (
        <div className="my-3">
            <form onSubmit={handleSubmit}>
                <Input onChange={handleInputChange} name="name" placeholder="Product Name" type="text" value={formData.name} />
                <Input onChange={handleInputChange} name="description" placeholder="Description" type="text" value={formData.description} />
                <Input onChange={handleInputChange} name="price" placeholder="Price" type="text" value={formData.price} />
                <Input onChange={handleInputChange} name="stock" placeholder="Stock" type="text" value={formData.stock} />
                <Input onChange={handleInputChange} name="category" placeholder="Category" type="text" value={formData.category} />
                <Input onChange={handleImageChange} accept='image/' name="images" type="file" multiple />

            </form>
        </div>
    );

    return (
        <div className="mx-[10rem] min-h-screen">
            <div>
                <button onClick={addProduct} className="my-20 mx-[10rem] w-[1000px] h-12 flex items-center justify-center rounded-md bg-red-500 text-white">Add a product</button>

                {
                    adminProducts?.map((item, i) => (
                        <div className="flex items-center justify-between border-b mb-2 py-2 px-4" key={i}>
                            <img className="w-20" src={item.images[0].url} alt="photo" />
                            <div className="text-xl">{item.name}</div>
                            <div className="mx-[10rem]  flex justify-between mb-2 py-2 px-4">
                                <MdEdit size={24} className="mr-4" />
                                <RiDeleteBinFill onClick={() => handleDelete(item._id)} size={24} className="mr-4" />
                            </div>
                        </div>
                    ))
                }
            </div>
            {openModal && <Modal title="Add a product" onClick={handleSubmit} content={content} btnName="add" />}
        </div>
    );
};
