import React from "react";

export function Button({ name, onClick }) {
    return <button className="w-[150px] h-10 flex items-center justify-center text-lg bg-black text-white rounded-md" onClick={onClick}>{name}</button>;
}