import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";

export const Cart = () => {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const deleteItem = (id) => {
        dispatch(removeFromCart(id))
    }

    return (
        <div className="h-screen">
            {
                cart?.carts?.length > 0 ?
                    <div>
                        {
                            cart?.carts?.map((item, i) => (
                                <div className="mx-[10rem] flex items-center justify-between border-b mb-2 py-2 px-4" key={i}>
                                    <img className="w-20" src={item.image} alt="pgoto" />
                                    <div className="text-xl">{item.name}</div>
                                    <div className="text-xl">£{item.price}</div>
                                    <div className="text-xl">Qty : {item.quantity}</div>
                                    <button onClick={() => deleteItem(item.id)} className="w-[100px] h-12 flex items-center justify-center rounded-md bg-red-500 text-white">Delete</button>
                                </div>
                            ))
                        }
                    </div> : <div>
                        <div className="flex justify-center items-center h-screen">
                            <div className="text-4xl">
                                Your shopping cart is empty!
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}
