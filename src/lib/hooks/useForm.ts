"use client";

import { useState, useCallback, useEffect } from 'react';
import {
  UseFormOptions,
  UseFormReturn,
  ValidationRule,
  ValidationError,
  ValidationResult
} from '../types';
import { validateField, validateForm } from '../utils/validation';

export const useForm = (options: UseFormOptions): UseFormReturn => {
  const {
    initialValues,
    validationRules = {},
    onSubmit,
    validateOnChange = true,
    validateOnBlur = true
  } = options;

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, ValidationError[]>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [dirty, setDirty] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Calculate overall form validity
  const isValid = Object.keys(errors).length === 0 ||
    Object.values(errors).every(fieldErrors => fieldErrors.length === 0);

  // Validate a single field
  const validateFieldByName = useCallback((name: string): ValidationError[] => {
    const fieldRules = validationRules[name];
    if (!fieldRules) return [];

    return validateField(values[name], fieldRules, name);
  }, [values, validationRules]);

  // Validate all fields
  const validateAll = useCallback((): ValidationResult => {
    return validateForm(values, validationRules);
  }, [values, validationRules]);

  // Set field value
  const setValue = useCallback((name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    setDirty(prev => ({ ...prev, [name]: true }));

    if (validateOnChange) {
      const fieldErrors = validateFieldByName(name);
      setErrors(prev => ({ ...prev, [name]: fieldErrors }));
    }
  }, [validateOnChange, validateFieldByName]);

  // Set field error
  const setError = useCallback((name: string, error: ValidationError) => {
    setErrors(prev => ({
      ...prev,
      [name]: [...(prev[name] || []), error]
    }));
  }, []);

  // Set field touched state
  const setTouchedField = useCallback((name: string, touchedState: boolean) => {
    setTouched(prev => ({ ...prev, [name]: touchedState }));

    if (validateOnBlur && touchedState) {
      const fieldErrors = validateFieldByName(name);
      setErrors(prev => ({ ...prev, [name]: fieldErrors }));
    }
  }, [validateOnBlur, validateFieldByName]);

  // Set field dirty state
  const setDirtyField = useCallback((name: string, dirtyState: boolean) => {
    setDirty(prev => ({ ...prev, [name]: dirtyState }));
  }, []);

  // Validate specific field or all fields
  const validate = useCallback((name?: string): ValidationResult => {
    if (name) {
      const fieldErrors = validateFieldByName(name);
      setErrors(prev => ({ ...prev, [name]: fieldErrors }));
      return {
        isValid: fieldErrors.length === 0,
        errors: fieldErrors
      };
    } else {
      return validateAll();
    }
  }, [validateFieldByName, validateAll]);

  // Reset form
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setDirty({});
    setIsSubmitting(false);
    setIsSubmitted(false);
  }, [initialValues]);

  // Submit form
  const submit = useCallback(async () => {
    const validationResult = validateAll();

    if (!validationResult.isValid) {
      // Set all fields as touched to show errors
      const touchedFields: Record<string, boolean> = {};
      Object.keys(validationRules).forEach(field => {
        touchedFields[field] = true;
      });
      setTouched(touchedFields);
      setErrors(validationResult.errors.reduce((acc, error) => {
        if (!acc[error.field]) acc[error.field] = [];
        acc[error.field].push(error);
        return acc;
      }, {} as Record<string, ValidationError[]>));
      return;
    }

    if (onSubmit) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
        setIsSubmitted(true);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [validateAll, validationRules, onSubmit, values]);

  // Update form when initialValues change
  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    dirty,
    isValid,
    isSubmitting,
    isSubmitted,
    setValue,
    setError,
    setTouched: setTouchedField,
    setDirty: setDirtyField,
    validate,
    validateAll,
    reset,
    submit
  };
}; 