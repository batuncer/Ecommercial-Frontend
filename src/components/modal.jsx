import React from "react";
import { useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";
import { openModalFunc } from "../redux/generalSlice";


export const Modal = ({ title, content, onClick, btnName }) => {

    const dispatch = useDispatch();

    return (
        <div className="w-full h-full fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="w-[500px] bg-white border p-4 rounded-md">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl">{title}</h1>
                    <MdClose clasName="cursor-pointer" onClick={() => dispatch(openModalFunc())} />
                </div>
                <div className="mt-4">
                    {content}
                </div>
                <div className="flex justify-end mt-4">
                    <button onClick={onClick} className="bg-blue-500 text-white py-2 px-4 rounded-md">{btnName}</button>
                </div>

            </div>

        </div >



    )
}