import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";
import { useAuthContext } from "../auth/useAuthContext";

export const Cart = () => {
    const cart = useSelector(state => state.cart);
    const { user } = useAuthContext();
    const dispatch = useDispatch();

    const deleteItem = (id) => {
        dispatch(removeFromCart(id));
    }

    const createOrder = async () => {
        try {
            const response = await fetch('http://localhost:8081/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId: cart.carts.map(item => item.id),
                    userId: user._id,
                    quantity: cart.carts.map(item => item.quantity),
                    price: cart.carts.map(item => item.price)
                })
            });

            if (response.ok) {
                const data = await response.json();
                alert('Order created successfully!');
            } else {
                alert('Failed to create order');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the order');
        }
    }

    return (
        <div className="h-screen">
            {
                cart?.carts?.length > 0 ?
                    <div>
                        {
                            cart?.carts?.map((item, i) => (
                                <div className="mx-[10rem] flex items-center justify-between border-b mb-2 py-2 px-4" key={i}>
                                    <img className="w-20" src={item.image} alt="photo" />
                                    <div className="text-xl">{item.name}</div>
                                    <div className="text-xl">£{item.price}</div>
                                    <div className="text-xl">Qty : {item.quantity}</div>
                                    <button onClick={() => deleteItem(item.id)} className="w-[100px] h-12 flex items-center justify-center rounded-md bg-red-500 text-white">Delete</button>
                                </div>
                            ))
                        }
                        <div className="mx-[10rem] flex justify-end">
                            <button onClick={createOrder} className="w-[200px] h-12 flex items-center justify-center rounded-md bg-green-500 text-white mt-4">Place Order</button>
                        </div>
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
