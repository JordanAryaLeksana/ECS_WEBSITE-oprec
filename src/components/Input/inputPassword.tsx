import React from 'react';
import Typography from '../Typography/Typography';
import { Field, useFormikContext, ErrorMessage } from 'formik';

interface InputProps {
    placeholder: string;
    name: string;
    label: string;
    prefix?: React.ReactNode | null;
    suffix?: React.ReactNode | null;
    maxLength?: number;
    type: string;
    disabled?: boolean;
    readonly?: boolean;
    helpertext?: React.ReactNode;
}

const InputPassword = ({
    placeholder,
    name,
    label,
    prefix,
    suffix,
    maxLength,
    type,
    disabled,
    readonly,
    helpertext,
}: InputProps) => {

    const inputRef = React.useRef<HTMLInputElement>(null);
    const { setFieldValue, errors, touched, values } = useFormikContext<{
        [key: string]: any;
    }>();
    const errorsLogic = touched[name] && errors[name] && !disabled && !readonly;
    const successLogic = touched[name] && !errors[name] && !disabled && !readonly;

    const handleClear = () => {
        setFieldValue(name, "");
        inputRef?.current?.focus();
    };

    return (
        <div className='mb-3'>
            <div className="w-full flex justify-between items-center gap-3 mb-2">
                <label htmlFor={name}>
                    <Typography variant='Header' size='xs' className='font-bold text-AddsOn-neutral'>
                        {label}
                    </Typography>
                </label>
                {maxLength && (
                    <Typography variant='Header' size="sm" className="text-AddsOn-neutral">
                        {values[name] ? values[name].length : 0} / {maxLength}
                    </Typography>
                )}
            </div>

            <div
                className={`
                    flex w-full rounded-sm items-center p-2 border border-solid gap-3 
                    ${errorsLogic ? "border-accent-error-500" : successLogic ? "border-accent-success-500" : "border-primary-light-active"}
                `}
            >
                {prefix && <div className="text-AddsOn-neutral">{prefix}</div>}

                <Field
                    name={name}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    type={type}
                    ref={inputRef}
                    className={`  bg-transparent focus:outline-none text-secondary-dark-dark placeholder:text-neutral-300 font-regular `}
                />

                {suffix && <div className='text-AddsOn-neutral'>{suffix}</div>}
            </div>
            <>
                {errorsLogic ? (
                    <ErrorMessage name={name}>
                        {(msg) => (
                            <Typography
                                variant='Header'
                                size="xs"
                                className="flex gap-1.5 items-center text-accent-error-500 font-semibold mt-2 "
                            >
                                {msg}
                            </Typography>
                        )}
                    </ErrorMessage>
                ) : (
                    helpertext && (
                        <Typography variant="Header" size="xs" className="block text-secondary-dark-dark mt-2 font-semibold">
                            {helpertext}
                        </Typography>
                    )
                )}
            </>
        </div>
    );
}

export default InputPassword;
