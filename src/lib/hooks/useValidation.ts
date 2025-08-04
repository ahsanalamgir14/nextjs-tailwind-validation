"use client";

import { useState, useCallback } from 'react';
import { ValidationRule, ValidationError } from '../types';
import { validateField } from '../utils/validation';

export interface UseValidationOptions {
    rules: ValidationRule;
    fieldName?: string;
    validateOnChange?: boolean;
}

export interface UseValidationReturn {
    errors: ValidationError[];
    isValid: boolean;
    validate: (value: any) => ValidationError[];
    clearErrors: () => void;
}

export const useValidation = (options: UseValidationOptions): UseValidationReturn => {
    const { rules, fieldName = 'field', validateOnChange = true } = options;
    const [errors, setErrors] = useState<ValidationError[]>([]);

    const validate = useCallback((value: any): ValidationError[] => {
        const validationErrors = validateField(value, rules, fieldName);

        if (validateOnChange) {
            setErrors(validationErrors);
        }

        return validationErrors;
    }, [rules, fieldName, validateOnChange]);

    const clearErrors = useCallback(() => {
        setErrors([]);
    }, []);

    const isValid = errors.length === 0;

    return {
        errors,
        isValid,
        validate,
        clearErrors
    };
}; 