import React from 'react';
import { FormProvider as Form } from 'react-hook-form';

const FormProvider = ({ children, methods }) => {
    return (
        <Form {...methods}>
            <form onSubmit={methods.handleSubmit}>{children}</form>
        </Form>
    );
}

export default FormProvider;