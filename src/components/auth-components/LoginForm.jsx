import React from 'react';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "../Button";
import RHFTextField from "../../hooks/RHFTextField";
import { useAuthContext } from '../../auth/useAuthContext';

const LoginForm = () => {
    const { login, token } = useAuthContext();

    const schema = Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required()
    });

    const methods = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            await login(data.username, data.password);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen " >
            <FormProvider {...methods} >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: 'sm', margin: 'auto' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>LOGIN PAGE</h1>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className=" rounded-md p-20" style={{ margin: '30px', backgroundColor: 'rgb(190, 242, 189)' }}>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                    User Name
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <RHFTextField name="username" id="inline-full-name" type="text" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                                    Password
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <RHFTextField name="password" id="inline-password" type="password" placeholder="******************" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                            </div>
                        </div>
                        <div className="md:flex md:items-center">
                            <div className="md:w-1/3"></div>
                            <div className="md:w-2/3">
                                <Button name="Login" type="submit" className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" />
                            </div>
                        </div>
                    </form>
                </div>
            </FormProvider>
        </div >
    );
}

export default LoginForm;
