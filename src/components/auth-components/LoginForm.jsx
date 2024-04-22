import React, { useState } from "react";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import FormProvider from "../../hooks/Form-provider";
import RHFTextField from "../../hooks/RHFTextField";
import { Button } from "../Button";

const LoginForm = ({ onSubmit }) => {
    const [showPassword, setShowPassword] = useState(false);


    const schema = Yup.object().shape({
        username: Yup.string().max(255, "Max 255").required(),
        password: Yup.string().required()

    })

    // const defaultValues = {
    //   username: 'baki',
    //   password: '1234'
    // }



    const methods = useForm({
        resolver: yupResolver(schema),

    });

    const {

        handleSubmit,

        formState: { isSubmitting, isValid },
    } = methods;






    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

            <div>
                <RHFTextField name='username' label='Username' />
                <RHFTextField
                    name='password'
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                />
                <Button name={"Login"} href={`/login`} />
            </div>
        </FormProvider>

    )
}

export default LoginForm