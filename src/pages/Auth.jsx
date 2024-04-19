import React, { useState } from "react";
import Input from "../components/Input";
import { Button } from "../components/Button";
import { useDispatch } from "react-redux";

const Auth = () => {
    const [singUp, setSingUp] = useState(true);
    const dispatch = useDispatch();
    const [data, setData] = useState({ name: "", email: "", password: "", file: "" });

    return (
        <div>
            <div className="">
                <div className="text-2xl">{singUp ? "Sing up" : "Login"}</div>
                <Input type={"text"} name={"name"} id={""} placeHolder={"Name"} />
                <Input type={"text"} name={"email"} id={""} placeHolder={"Email"} />
                <Input type={"password"} name={"password"} id={""} placeHolder={"Password"} />
                <Input type={"file"} name={"avatar"} id={""} placeHolder={""} />
                <Button name={singUp ? "Sing up" : "Login"} onClick={singUp ? registerFunc : loingFunc} />
            </div>
        </div>
    )
}

export default Auth;