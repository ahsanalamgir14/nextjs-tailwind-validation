"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { UseFormOptions, UseFormReturn } from '../types';
import { useForm } from '../hooks/useForm';
import { ValidatedInput } from './ValidatedInput';

// Create form context
const FormContext = createContext<UseFormReturn | null>(null);

// Hook to use form context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a ValidatedForm');
  }
  return context;
};

export interface ValidatedFormProps extends Omit<UseFormOptions, 'onSubmit'> {
  children: ReactNode;
  className?: string;
  onSubmit?: (e: React.FormEvent) => void;
}

export const ValidatedForm: React.FC<ValidatedFormProps> = ({
  children,
  className = '',
  onSubmit,
  ...formOptions
}) => {
  const form = useForm(formOptions);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSubmit) {
      onSubmit(e);
    } else {
      form.submit();
    }
  };

  const formClasses = `
    space-y-6
    ${className}
  `;

            // Clone children and inject form prop into ValidatedInput components
          const childrenWithForm = React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              // If it's a ValidatedInput, inject the form prop
              if (child.type === ValidatedInput ||
                  (typeof child.type === 'function' && (child.type as any).displayName === 'ValidatedInput')) {
                return React.cloneElement(child, { form } as any);
              }

              // Recursively process nested children
              if ((child.props as any).children) {
                const processedChildren = React.Children.map((child.props as any).children, (nestedChild) => {
                  if (React.isValidElement(nestedChild)) {
                    if (nestedChild.type === ValidatedInput ||
                        (typeof nestedChild.type === 'function' && (nestedChild.type as any).displayName === 'ValidatedInput')) {
                      return React.cloneElement(nestedChild, { form } as any);
                    }
                  }
                  return nestedChild;
                });
                return React.cloneElement(child, {}, processedChildren);
              }
            }
            return child;
          });

  return (
    <FormContext.Provider value={form}>
      <form onSubmit={handleSubmit} className={formClasses} noValidate>
        {childrenWithForm}
      </form>
    </FormContext.Provider>
  );
};

// Form submission button component
export interface SubmitButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  loadingText?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  className = '',
  disabled,
  loadingText = 'Submitting...'
}) => {
  const form = useFormContext();
  
  const buttonClasses = `
    w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
    bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    disabled:bg-gray-400 disabled:cursor-not-allowed
    transition-colors duration-200
    ${className}
  `;

  return (
    <button
      type="submit"
      disabled={disabled || form.isSubmitting}
      className={buttonClasses}
    >
      {form.isSubmitting ? loadingText : children}
    </button>
  );
};

// Form reset button component
export interface ResetButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export const ResetButton: React.FC<ResetButtonProps> = ({
  children,
  className = '',
  disabled
}) => {
  const form = useFormContext();
  
  const buttonClasses = `
    w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 
    bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    disabled:bg-gray-100 disabled:cursor-not-allowed
    transition-colors duration-200
    ${className}
  `;

  const handleReset = () => {
    form.reset();
  };

  return (
    <button
      type="button"
      onClick={handleReset}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
}; 