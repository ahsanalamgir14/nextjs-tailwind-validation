import React, { ReactNode } from 'react';

interface ValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string | RegExp;
    email?: boolean;
    url?: boolean;
    numeric?: boolean;
    min?: number;
    max?: number;
    custom?: (value: any) => string | null;
}
interface ValidationError {
    field: string;
    message: string;
    type: string;
}
interface FormField {
    name: string;
    value: any;
    errors: ValidationError[];
    touched: boolean;
    dirty: boolean;
}
interface ValidationResult {
    isValid: boolean;
    errors: ValidationError[];
}
interface UseFormOptions {
    initialValues: Record<string, any>;
    validationRules?: Record<string, ValidationRule>;
    onSubmit?: (values: Record<string, any>) => void | Promise<void>;
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
}
interface FormState {
    values: Record<string, any>;
    errors: Record<string, ValidationError[]>;
    touched: Record<string, boolean>;
    dirty: Record<string, boolean>;
    isValid: boolean;
    isSubmitting: boolean;
    isSubmitted: boolean;
}
interface FormActions {
    setValue: (name: string, value: any) => void;
    setError: (name: string, error: ValidationError) => void;
    setTouched: (name: string, touched: boolean) => void;
    setDirty: (name: string, dirty: boolean) => void;
    validate: (name?: string) => ValidationResult;
    validateAll: () => ValidationResult;
    reset: () => void;
    submit: () => Promise<void>;
}
interface UseFormReturn extends FormState, FormActions {
}
type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea' | 'select' | 'checkbox' | 'radio';
interface InputProps {
    name: string;
    type?: InputType;
    label?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    errorClassName?: string;
    successClassName?: string;
    validationRules?: ValidationRule;
    showError?: boolean;
    showSuccess?: boolean;
}

interface ValidatedInputProps extends Omit<InputProps, 'validationRules'> {
    form?: UseFormReturn;
    validationRules?: ValidationRule;
    onValueChange?: (value: any) => void;
    children?: React.ReactNode;
}
declare const ValidatedInput: React.ForwardRefExoticComponent<ValidatedInputProps & React.RefAttributes<HTMLInputElement | HTMLTextAreaElement>>;

declare const useFormContext: () => UseFormReturn;
interface ValidatedFormProps extends Omit<UseFormOptions, 'onSubmit'> {
    children: ReactNode;
    className?: string;
    onSubmit?: (e: React.FormEvent) => void;
}
declare const ValidatedForm: React.FC<ValidatedFormProps>;
interface SubmitButtonProps {
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    loadingText?: string;
}
declare const SubmitButton: React.FC<SubmitButtonProps>;
interface ResetButtonProps {
    children: ReactNode;
    className?: string;
    disabled?: boolean;
}
declare const ResetButton: React.FC<ResetButtonProps>;

interface ErrorMessageProps {
    error?: string | null;
    errors?: string[];
    className?: string;
    showIcon?: boolean;
}
declare const ErrorMessage: React.FC<ErrorMessageProps>;

interface SuccessMessageProps {
    message?: string;
    className?: string;
    showIcon?: boolean;
}
declare const SuccessMessage: React.FC<SuccessMessageProps>;

declare const useForm: (options: UseFormOptions) => UseFormReturn;

interface UseFieldOptions {
    name: string;
    validationRules?: ValidationRule;
    form: UseFormReturn;
}
interface UseFieldReturn {
    value: any;
    error: string | null;
    errors: string[];
    touched: boolean;
    dirty: boolean;
    setValue: (value: any) => void;
    setTouched: (touched: boolean) => void;
    validate: () => boolean;
    reset: () => void;
}
declare const useField: ({ name, validationRules, form }: UseFieldOptions) => UseFieldReturn;

interface UseValidationOptions {
    rules: ValidationRule;
    fieldName?: string;
    validateOnChange?: boolean;
}
interface UseValidationReturn {
    errors: ValidationError[];
    isValid: boolean;
    validate: (value: any) => ValidationError[];
    clearErrors: () => void;
}
declare const useValidation: (options: UseValidationOptions) => UseValidationReturn;

declare const validateField: (value: any, rules: ValidationRule, fieldName: string) => ValidationError[];
declare const validateForm: (values: Record<string, any>, rules: Record<string, ValidationRule>) => ValidationResult;
declare const validationRules: {
    email: {
        required: boolean;
        email: boolean;
    };
    password: {
        required: boolean;
        minLength: number;
        pattern: string;
    };
    phone: {
        pattern: string;
    };
    url: {
        url: boolean;
    };
    numeric: {
        numeric: boolean;
    };
    required: {
        required: boolean;
    };
};

declare const formatPhoneNumber: (value: string) => string;
declare const formatCurrency: (value: number, currency?: string, locale?: string) => string;
declare const formatDate: (date: Date | string, options?: Intl.DateTimeFormatOptions) => string;
declare const formatCreditCard: (value: string) => string;
declare const formatSSN: (value: string) => string;
declare const capitalize: (value: string) => string;
declare const titleCase: (value: string) => string;
declare const truncate: (value: string, length: number, suffix?: string) => string;
declare const formatFileSize: (bytes: number) => string;

declare const debounce: <T extends (...args: any[]) => any>(func: T, wait: number) => ((...args: Parameters<T>) => void);
declare const deepClone: <T>(obj: T) => T;
declare const getNestedValue: (obj: any, path: string) => any;
declare const setNestedValue: (obj: any, path: string, value: any) => void;
declare const generateId: () => string;
declare const isEmpty: (value: any) => boolean;
declare const isValidEmail: (email: string) => boolean;
declare const isValidUrl: (url: string) => boolean;
declare const isNumeric: (value: any) => boolean;
declare const objectToQueryString: (obj: Record<string, any>) => string;
declare const queryStringToObject: (queryString: string) => Record<string, string>;
declare const sleep: (ms: number) => Promise<void>;

export { ErrorMessage, type ErrorMessageProps, type FormActions, type FormField, type FormState, type InputProps, type InputType, ResetButton, type ResetButtonProps, SubmitButton, type SubmitButtonProps, SuccessMessage, type SuccessMessageProps, type UseFieldOptions, type UseFieldReturn, type UseFormOptions, type UseFormReturn, type UseValidationOptions, type UseValidationReturn, ValidatedForm, type ValidatedFormProps, ValidatedInput, type ValidatedInputProps, type ValidationError, type ValidationResult, type ValidationRule, capitalize, debounce, deepClone, formatCreditCard, formatCurrency, formatDate, formatFileSize, formatPhoneNumber, formatSSN, generateId, getNestedValue, isEmpty, isNumeric, isValidEmail, isValidUrl, objectToQueryString, queryStringToObject, setNestedValue, sleep, titleCase, truncate, useField, useForm, useFormContext, useValidation, validateField, validateForm, validationRules };
