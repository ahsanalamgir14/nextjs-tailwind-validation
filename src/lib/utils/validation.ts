import { ValidationRule, ValidationError, ValidationResult } from '../types';

export const validateField = (value: any, rules: ValidationRule, fieldName: string): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Required validation
  if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    errors.push({
      field: fieldName,
      message: `${fieldName} is required`,
      type: 'required'
    });
    return errors; // Don't validate other rules if required fails
  }

  // Skip other validations if value is empty and not required
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return errors;
  }

  // Email validation
  if (rules.email && typeof value === 'string') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      errors.push({
        field: fieldName,
        message: 'Please enter a valid email address',
        type: 'email'
      });
    }
  }

  // URL validation
  if (rules.url && typeof value === 'string') {
    try {
      new URL(value);
    } catch {
      errors.push({
        field: fieldName,
        message: 'Please enter a valid URL',
        type: 'url'
      });
    }
  }

  // Numeric validation
  if (rules.numeric && typeof value === 'string') {
    if (!/^\d+(\.\d+)?$/.test(value)) {
      errors.push({
        field: fieldName,
        message: 'Please enter a valid number',
        type: 'numeric'
      });
    }
  }

  // Length validations
  if (typeof value === 'string') {
    if (rules.minLength && value.length < rules.minLength) {
      errors.push({
        field: fieldName,
        message: `${fieldName} must be at least ${rules.minLength} characters`,
        type: 'minLength'
      });
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      errors.push({
        field: fieldName,
        message: `${fieldName} must be no more than ${rules.maxLength} characters`,
        type: 'maxLength'
      });
    }
  }

  // Pattern validation
  if (rules.pattern && typeof value === 'string') {
    const pattern = typeof rules.pattern === 'string' ? new RegExp(rules.pattern) : rules.pattern;
    if (!pattern.test(value)) {
      errors.push({
        field: fieldName,
        message: `${fieldName} format is invalid`,
        type: 'pattern'
      });
    }
  }

  // Number range validations
  if (typeof value === 'number' || (typeof value === 'string' && !isNaN(Number(value)))) {
    const numValue = typeof value === 'string' ? Number(value) : value;

    if (rules.min !== undefined && numValue < rules.min) {
      errors.push({
        field: fieldName,
        message: `${fieldName} must be at least ${rules.min}`,
        type: 'min'
      });
    }

    if (rules.max !== undefined && numValue > rules.max) {
      errors.push({
        field: fieldName,
        message: `${fieldName} must be no more than ${rules.max}`,
        type: 'max'
      });
    }
  }

  // Custom validation
  if (rules.custom) {
    const customError = rules.custom(value);
    if (customError) {
      errors.push({
        field: fieldName,
        message: customError,
        type: 'custom'
      });
    }
  }

  return errors;
};

export const validateForm = (
  values: Record<string, any>,
  rules: Record<string, ValidationRule>
): ValidationResult => {
  const errors: ValidationError[] = [];

  Object.keys(rules).forEach(fieldName => {
    const fieldErrors = validateField(values[fieldName], rules[fieldName], fieldName);
    errors.push(...fieldErrors);
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Predefined validation rules
export const validationRules = {
  email: {
    required: true,
    email: true
  },
  password: {
    required: true,
    minLength: 8,
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]'
  },
  phone: {
    pattern: '^[\\+]?[1-9][\\d]{0,15}$'
  },
  url: {
    url: true
  },
  numeric: {
    numeric: true
  },
  required: {
    required: true
  }
}; 