import React, { useState } from "react";
import { SlBasket } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getKeyword } from "../redux/generalSlice";
import { useAuthContext } from '../../src/auth/useAuthContext';

const Header = () => {
    const [opened, setOpened] = useState(false);
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const { logout } = useAuthContext();
    const cart = useSelector(state => state.cart)


    const menuItems = [
        {
            name: "Home",
            url: "/"
        },

    ];

    if (!token) {
        menuItems.unshift(
            {
                name: "Login",
                url: "/login"
            },
            {
                name: "Signup",
                url: "/signup"
            }

        );
    } else {
        menuItems.push(

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
                url: "/",
                onClick: () => {
                    logout();
                    navigate("/");
                }
            }
        );
    }

    const searchProduct = () => {
        dispatch(getKeyword(keyword))
        setKeyword("")
        navigate('products')
    }

    const handleMenuItemClick = (url) => {
        navigate(url);
        setOpened(false);
    };

    return (
        <div className='bg-gray-100 h-16 px-5 flex items-center justify-between'>
            <div className="text-4xl">
                e.com
            </div>
            <div className="flex items-center gap-5">
                <div className="flex items-center">
                    <input value={keyword} onChange={e => setKeyword(e.target.value)} className='p-2 outline-none cursor-pointer' type="text" placeholder="Search" />
                    <button onClick={searchProduct} className='p-2 ml-1 cursor-pointer bg-white'>Search</button>
                </div>

                <div className="relative">
                    <CgProfile onClick={() => setOpened(!opened)} className="w-8 h-8" />
                    {opened && (
                        <div className="absolute w-[200px] bg-white shadow-lg shadow-grey-900">
                            {menuItems.map((item, i) => (
                                <div className="px-2 py-1 hover:bg-gray-300" key={i} onClick={() => {
                                    if (item.onClick)
                                        item.onClick()
                                    else {
                                        handleMenuItemClick(item.url)
                                    }
                                }}>{item.name}</div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="relative cursor-pointer" >
                    <SlBasket size={25} onClick={() => navigate('/cart')} />
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">{cart?.carts?.length}</div>
                </div>
            </div>
        </div>
    );
};

export default Header;
