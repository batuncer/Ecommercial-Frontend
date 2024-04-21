import React from "react";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import FormProvider from "../hooks-form/form-provider";
import RHFTextField from "../hooks-form/RHFTextField";
const LoginForm = ({ onSubmit }) => {



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
        reset,
        watch,
        setValue,
        handleSubmit,
        getValues,
        formState: { isSubmitting, isValid },
    } = methods;






    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

            <div>
                <RHFTextField name='username' label='User Name' />
                <RHFTextField name='password' label='Password' />
                <Button type='submit' variant="contained">Login</Button>
            </div>
        </FormProvider>

    )
}

export default LoginForm