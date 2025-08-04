"use client";

import React, { forwardRef, useState } from 'react';
import { InputProps, ValidationRule } from '../types';
import { useField } from '../hooks/useField';
import { UseFormReturn } from '../types';

export interface ValidatedInputProps extends Omit<InputProps, 'validationRules'> {
  form?: UseFormReturn;
  validationRules?: ValidationRule;
  onValueChange?: (value: any) => void;
  children?: React.ReactNode;
}

export const ValidatedInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, ValidatedInputProps>(
  ({ 
    name, 
    type = 'text', 
    label, 
    placeholder, 
    required, 
    disabled, 
    className = '',
    errorClassName = '',
    successClassName = '',
    validationRules,
    form,
    showError = true,
    showSuccess = true,
    onValueChange,
    children,
    ...props 
  }, ref) => {
    const [localValue, setLocalValue] = useState('');
    const [localTouched, setLocalTouched] = useState(false);
    const [localErrors, setLocalErrors] = useState<string[]>([]);

    // Use form field if form is provided, otherwise use local state
    const field = form ? useField({ name, validationRules, form }) : null;
    
    const value = field?.value ?? localValue;
    const touched = field?.touched ?? localTouched;
    const errors = field?.errors ?? localErrors;
    const hasError = touched && errors.length > 0;
    const hasSuccess = touched && !hasError && value && showSuccess;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      
      if (field) {
        field.setValue(newValue);
      } else {
        setLocalValue(newValue);
        // Simple local validation
        if (validationRules) {
          const validationErrors: string[] = [];
          
          // Required validation
          if (validationRules.required && !newValue.trim()) {
            validationErrors.push(`${name} is required`);
          }
          
          // Email validation
          if (validationRules.email && newValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newValue)) {
            validationErrors.push('Please enter a valid email address');
          }
          
          // URL validation
          if (validationRules.url && newValue) {
            try {
              new URL(newValue);
            } catch {
              validationErrors.push('Please enter a valid URL');
            }
          }
          
          // Length validations
          if (validationRules.minLength && newValue.length < validationRules.minLength) {
            validationErrors.push(`${name} must be at least ${validationRules.minLength} characters`);
          }
          
          if (validationRules.maxLength && newValue.length > validationRules.maxLength) {
            validationErrors.push(`${name} must be no more than ${validationRules.maxLength} characters`);
          }
          
          // Pattern validation
          if (validationRules.pattern && newValue) {
            const pattern = typeof validationRules.pattern === 'string' 
              ? new RegExp(validationRules.pattern) 
              : validationRules.pattern;
            if (!pattern.test(newValue)) {
              validationErrors.push(`${name} format is invalid`);
            }
          }
          
          setLocalErrors(validationErrors);
        }
      }
      
      onValueChange?.(newValue);
    };

    const handleBlur = () => {
      if (field) {
        field.setTouched(true);
      } else {
        setLocalTouched(true);
      }
    };

    const handleFocus = () => {
      if (field) {
        field.setTouched(true);
      } else {
        setLocalTouched(true);
      }
    };

    // Base classes
    const baseClasses = `
      w-full px-3 py-2 border rounded-md shadow-sm 
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
      disabled:bg-gray-100 disabled:cursor-not-allowed
      transition-colors duration-200
    `;

    // Conditional classes
    const inputClasses = `
      ${baseClasses}
      ${hasError 
        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
        : hasSuccess 
        ? 'border-green-300 focus:ring-green-500 focus:border-green-500' 
        : 'border-gray-300'
      }
      ${className}
    `;

    const errorClasses = `
      mt-1 text-sm text-red-600
      ${errorClassName}
    `;

    const successClasses = `
      mt-1 text-sm text-green-600
      ${successClassName}
    `;

    const labelClasses = `
      block text-sm font-medium text-gray-700 mb-1
      ${required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''}
    `;

    const renderInput = () => {
      const baseProps = {
        name,
        value,
        placeholder,
        disabled,
        onChange: handleChange,
        onBlur: handleBlur,
        onFocus: handleFocus,
        className: inputClasses,
        ...props
      };

      if (type === 'textarea') {
        return <textarea {...baseProps} ref={ref as React.Ref<HTMLTextAreaElement>} rows={4} />;
      }

      return <input {...baseProps} ref={ref as React.Ref<HTMLInputElement>} type={type} />;
    };

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={name} className={labelClasses}>
            {label}
          </label>
        )}
        
        <div className="relative">
          {renderInput()}
          {children}
        </div>

        {hasError && showError && (
          <div className={errorClasses}>
            {errors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>
        )}

        {hasSuccess && (
          <div className={successClasses}>
            ✓ Valid
          </div>
        )}
      </div>
    );
  }
);

ValidatedInput.displayName = 'ValidatedInput'; 