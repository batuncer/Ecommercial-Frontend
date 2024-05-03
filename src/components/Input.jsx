import React from "react";

const Input = ({ placeholder, value, name, id, type, onChange }) => {
    return (
        <input
            className="w-full h-10 p-2 outline-none rounded-md border border-gray-300"
            id={id}
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}

export default Input;