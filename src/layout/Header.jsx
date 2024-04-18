import React, { useState } from "react";
import { SlBasket } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getKeyword } from "../redux/generalSlice";
const Header = () => {
    const [opened, setOpened] = useState(false);
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const menuItems = [
        {
            name: 'Profile',
            url: "/profile"
        },
        {
            name: "Admin",
            url: "/admin"
        },
        {
            name: "Logout",
            url: "/logout"
        }
    ];
    const searchProduct = () => {
        dispatch(getKeyword(keyword))
        setKeyword("")
        navigate('products')
    }
    return (
        <div className='bg-gray-100 h-16 px-5 flex items-center justify-between'>
            <div className="text-4xl">
                baki.ecom
            </div>
            <div className="flex items-center gap-5">
                <div className="flex items-center">
                    <input value={keyword} onChange={e => setKeyword(e.target.value)} className='p-2 outline-none' type="text" placeholder="Search" />
                    <button onClick={searchProduct} className='p-2 ml-1 cursor-pointer bg-white'>Search</button>
                </div>

                <div className="relative">
                    <CgProfile onClick={() => setOpened(!opened)} className="w-8 h-8" />
                    {opened && (
                        <div className="absolute w-[200px] bg-white shadow-lg shadow-grey-900">
                            {menuItems.map((item, i) => (
                                <div className="px-2 py-1 hover:bg-gray-300" key={i}>{item.name}</div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="relative">
                    <SlBasket size={25} />
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">3</div>
                </div>
            </div>
        </div>
    );
};

export default Header;
