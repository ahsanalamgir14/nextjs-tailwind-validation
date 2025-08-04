export interface ValidationRule {
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

export interface ValidationError {
  field: string;
  message: string;
  type: string;
}

export interface FormField {
  name: string;
  value: any;
  errors: ValidationError[];
  touched: boolean;
  dirty: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface UseFormOptions {
  initialValues: Record<string, any>;
  validationRules?: Record<string, ValidationRule>;
  onSubmit?: (values: Record<string, any>) => void | Promise<void>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export interface FormState {
  values: Record<string, any>;
  errors: Record<string, ValidationError[]>;
  touched: Record<string, boolean>;
  dirty: Record<string, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
  isSubmitted: boolean;
}

export interface FormActions {
  setValue: (name: string, value: any) => void;
  setError: (name: string, error: ValidationError) => void;
  setTouched: (name: string, touched: boolean) => void;
  setDirty: (name: string, dirty: boolean) => void;
  validate: (name?: string) => ValidationResult;
  validateAll: () => ValidationResult;
  reset: () => void;
  submit: () => Promise<void>;
}

export interface UseFormReturn extends FormState, FormActions {}

export type InputType = 
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio';

export interface InputProps {
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