import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

const RHFTextField = ({ name, ...other }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <input
                    {...field}
                    fullWidth
                    value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
                    error={!!error}
                    helperText={error?.message}
                    {...other}
                />
            )}
        />
    );
}

export default RHFTextField;