import { useFormContext, Controller } from 'react-hook-form';


export default function RHFTextField({ name, ...other }) {
    const { control, setValue } = useFormContext();

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
