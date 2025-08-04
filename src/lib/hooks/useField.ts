"use client";

import { useCallback } from 'react';
import { UseFormReturn, ValidationRule } from '../types';
import { validateField } from '../utils/validation';

export interface UseFieldOptions {
  name: string;
  validationRules?: ValidationRule;
  form: UseFormReturn;
}

export interface UseFieldReturn {
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

export const useField = ({ name, validationRules, form }: UseFieldOptions): UseFieldReturn => {
  const value = form.values[name];
  const fieldErrors = form.errors[name] || [];
  const touched = form.touched[name] || false;
  const dirty = form.dirty[name] || false;

  const setValue = useCallback((newValue: any) => {
    form.setValue(name, newValue);
  }, [form, name]);

  const setTouched = useCallback((touchedState: boolean) => {
    form.setTouched(name, touchedState);
  }, [form, name]);

  const validate = useCallback((): boolean => {
    if (!validationRules) return true;
    
    const errors = validateField(value, validationRules, name);
    form.setError(name, errors[0] || null);
    return errors.length === 0;
  }, [validationRules, value, name, form]);

  const reset = useCallback(() => {
    form.setValue(name, form.values[name]);
    form.setTouched(name, false);
    form.setDirty(name, false);
  }, [form, name]);

  return {
    value,
    error: fieldErrors[0]?.message || null,
    errors: fieldErrors.map(error => error.message),
    touched,
    dirty,
    setValue,
    setTouched,
    validate,
    reset
  };
}; 