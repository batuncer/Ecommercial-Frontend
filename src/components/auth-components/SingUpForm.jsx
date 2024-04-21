import React, { useState } from "react";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import FormProvider from "../hooks-form/form-provider";
import RHFTextField from "../hooks-form/RHFTextField";
import Iconify from "../iconify/Iconify";

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
        reset,
        watch,
        setValue,
        handleSubmit,
        getValues,
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

            <Stack spacing={2}>
                <RHFTextField name='username' label='User Name' />
                <RHFTextField name='email' label='User email' />
                <RHFTextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <RHFTextField
                    name="password_confirmation"
                    label="Confirm Password"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <RHFTextField name='file' label='User avatar' />

                <Button type='submit' variant="contained">Sign Up</Button>
                <Button href={`/login`} >Login</Button>

            </Stack>

        </FormProvider>

    )
}

export default SignUpForm