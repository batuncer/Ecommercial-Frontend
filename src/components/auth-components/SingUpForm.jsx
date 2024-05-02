import React, { useState } from 'react';
import * as Yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RHFTextField from '../../hooks/RHFTextField';
import { Button } from '../Button';
import { useAuthContext } from '../../auth/useAuthContext';
import { useNavigate } from 'react-router-dom';


const SignUpForm = () => {
    const { register } = useAuthContext();
    const navigate = useNavigate();

    const methods = useForm({
        resolver: yupResolver(Yup.object().shape({
            username: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required(),
            avatar: Yup.string().optional()
        }))
    });

    const {
        reset,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = methods;
    //const [error, setError] = useState('');

    const onSubmit = async (data) => {
        try {
            await register(data.email, data.password, data.username, data.role);
            navigate('/')
            setLoged(true)

        } catch (error) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <FormProvider {...methods} >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: 'sm', margin: 'auto' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>SIGN UP PAGE</h1>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className=" rounded-md p-20" style={{ margin: '30px', backgroundColor: 'rgb(176, 226, 222)' }}>

                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="username">
                                    Username
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <RHFTextField name="username" id="username" type="text" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="email">
                                    Email
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <RHFTextField name="email" id="email" type="email" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="password">
                                    Password
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <RHFTextField name="password" id="password" type="password" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                            </div>
                        </div>

                        <div className="md:flex md:items-center">
                            <div className="md:w-1/3"></div>
                            <div className="md:w-2/3">
                                {/* <Button name="Sign Up" className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" /> */}
                                <button className="w-[150px] h-10 flex items-center justify-center text-lg bg-black text-white rounded-md" type='submit' >Sign Up</button>
                            </div>
                        </div>
                    </form>
                </div>
            </FormProvider>
        </div>
    );
}

export default SignUpForm;
