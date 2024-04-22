import React, { useState } from "react";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import FormProvider from "../../hooks/Form-provider";
import RHFTextField from "../../hooks/RHFTextField";
import { IconButton } from "@material-tailwind/react";
import Iconify from "../../iconify/iconify";
import { Button } from "../Button";

const SignUpForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const schema = Yup.object().shape({
        username: Yup.string().max(255, "Max 255").required(),
        email: Yup.string().max(255, "Max 255").required(),
        password: Yup.string().required(),
        file: Yup.string().required()
    })

    const methods = useForm({
        resolver: yupResolver(schema),

    });

    const {

        handleSubmit,

        formState: { isSubmitting, isValid },
    } = methods;

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                console.log(result.message);
                // Replace to main page when we created
            } else {
                console.error(result.error);
                // Display an error message to the user
            }
        } catch (error) {
            console.error("Error during signup:", error);
            // Handle unexpected errors
        }
    };
    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

            <div>
                <RHFTextField name='username' label='Username' />
                <RHFTextField name='email' label='Email' />
                <RHFTextField
                    name='password'
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                />
                <RHFTextField name='file' label='Avatar' />
                <Button type='submit' name={"Signup"} onClick={''} />
                <Button name={"Login"} href={`/login`} />

            </div>

        </FormProvider>

    )
}

export default SignUpForm