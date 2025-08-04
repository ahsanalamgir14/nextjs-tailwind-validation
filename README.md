# NextJS Validation Tailwind

A comprehensive validation library for Next.js applications with beautiful Tailwind CSS styling. Built with TypeScript and React hooks for optimal developer experience.

## Features

- 🎯 **TypeScript First** - Full TypeScript support with comprehensive type definitions
- 🎨 **Tailwind CSS Styled** - Beautiful, responsive components with Tailwind CSS
- ⚡ **React Hooks** - Modern React hooks for form management and validation
- 🔧 **Flexible Validation** - Custom validation rules with built-in common validators
- 📱 **Responsive Design** - Mobile-first responsive components
- 🚀 **Performance Optimized** - Lightweight and fast with minimal bundle size
- 🛠 **Easy Integration** - Simple setup and easy to integrate with existing projects

## Installation

```bash
npm install nextjs-validation-tailwind
```

## Quick Start

### Basic Form with Validation

```tsx
import {
  ValidatedForm,
  ValidatedInput,
  SubmitButton,
} from "nextjs-validation-tailwind";
import { validationRules } from "nextjs-validation-tailwind/utils";

export default function ContactForm() {
  const handleSubmit = async (values: any) => {
    console.log("Form submitted:", values);
    // Handle form submission
  };

  return (
    <ValidatedForm
      initialValues={{
        name: "",
        email: "",
        message: "",
      }}
      validationRules={{
        name: { required: true, minLength: 2 },
        email: validationRules.email,
        message: { required: true, minLength: 10 },
      }}
      onSubmit={handleSubmit}
    >
      <ValidatedInput
        name="name"
        label="Full Name"
        placeholder="Enter your full name"
        form={form}
      />

      <ValidatedInput
        name="email"
        type="email"
        label="Email Address"
        placeholder="Enter your email"
        form={form}
      />

      <ValidatedInput
        name="message"
        type="textarea"
        label="Message"
        placeholder="Enter your message"
        form={form}
      />

      <SubmitButton>Send Message</SubmitButton>
    </ValidatedForm>
  );
}
```

### Using Hooks Directly

```tsx
import { useForm, useField } from "nextjs-validation-tailwind";

export default function LoginForm() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validationRules: {
      email: { required: true, email: true },
      password: { required: true, minLength: 8 },
    },
    onSubmit: async (values) => {
      // Handle login
    },
  });

  const emailField = useField({
    name: "email",
    form,
  });

  const passwordField = useField({
    name: "password",
    form,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.submit();
      }}
    >
      <input
        type="email"
        value={emailField.value}
        onChange={(e) => emailField.setValue(e.target.value)}
        onBlur={() => emailField.setTouched(true)}
      />
      {emailField.error && (
        <div className="text-red-500">{emailField.error}</div>
      )}

      <input
        type="password"
        value={passwordField.value}
        onChange={(e) => passwordField.setValue(e.target.value)}
        onBlur={() => passwordField.setTouched(true)}
      />
      {passwordField.error && (
        <div className="text-red-500">{passwordField.error}</div>
      )}

      <button type="submit" disabled={form.isSubmitting}>
        {form.isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
```

## API Reference

### Components

#### ValidatedForm

A form wrapper that provides validation context and handles form submission.

```tsx
<ValidatedForm
  initialValues={object}
  validationRules={object}
  onSubmit={function}
  validateOnChange={boolean}
  validateOnBlur={boolean}
  className={string}
>
  {/* Form fields */}
</ValidatedForm>
```

#### ValidatedInput

A styled input component with built-in validation display.

```tsx
<ValidatedInput
  name={string}
  type={InputType}
  label={string}
  placeholder={string}
  required={boolean}
  disabled={boolean}
  className={string}
  errorClassName={string}
  successClassName={string}
  validationRules={ValidationRule}
  showError={boolean}
  showSuccess={boolean}
  form={UseFormReturn}
/>
```

#### SubmitButton

A styled submit button that shows loading state.

```tsx
<SubmitButton className={string} disabled={boolean} loadingText={string}>
  Submit
</SubmitButton>
```

#### ResetButton

A styled reset button that clears the form.

```tsx
<ResetButton className={string} disabled={boolean}>
  Reset
</ResetButton>
```

#### ErrorMessage

A component for displaying validation errors.

```tsx
<ErrorMessage
  error={string}
  errors={string[]}
  className={string}
  showIcon={boolean}
/>
```

#### SuccessMessage

A component for displaying success states.

```tsx
<SuccessMessage message={string} className={string} showIcon={boolean} />
```

### Hooks

#### useForm

Main form management hook.

```tsx
const form = useForm({
  initialValues: object,
  validationRules: object,
  onSubmit: function,
  validateOnChange: boolean,
  validateOnBlur: boolean
});
```

#### useField

Field-specific hook for individual form fields.

```tsx
const field = useField({
  name: string,
  validationRules: ValidationRule,
  form: UseFormReturn,
});
```

#### useValidation

Standalone validation hook.

```tsx
const validation = useValidation({
  rules: ValidationRule,
  fieldName: string,
  validateOnChange: boolean,
});
```

### Validation Rules

```tsx
const validationRule = {
  required: boolean,           // Field is required
  minLength: number,          // Minimum string length
  maxLength: number,          // Maximum string length
  pattern: string | RegExp,   // Regular expression pattern (string recommended for Next.js)
  email: boolean,             // Email validation
  url: boolean,               // URL validation
  numeric: boolean,           // Numeric validation
  min: number,                // Minimum numeric value
  max: number,                // Maximum numeric value
  custom: function            // Custom validation function
};
```

### Predefined Validation Rules

```tsx
import { validationRules } from "nextjs-validation-tailwind/utils";

// Available predefined rules
validationRules.email; // Email validation
validationRules.password; // Strong password validation
validationRules.phone; // Phone number validation
validationRules.url; // URL validation
validationRules.numeric; // Numeric validation
validationRules.required; // Required field validation
```

### Utility Functions

```tsx
import {
  validateField,
  validateForm,
  formatPhoneNumber,
  formatCurrency,
  formatDate,
  debounce,
  deepClone,
  isEmpty,
  isValidEmail,
  isValidUrl,
  isNumeric,
} from "nextjs-validation-tailwind/utils";
```

## Important Notes

### Pattern Validation in Next.js

When using pattern validation in Next.js App Router, use string patterns instead of RegExp objects to avoid serialization issues:

```tsx
// ✅ Recommended for Next.js
validationRules: {
  phone: {
    pattern: "^[\\+]?[1-9][\\d]{0,15}$";
  }
}

// ❌ Avoid in Next.js App Router
validationRules: {
  phone: {
    pattern: /^[\+]?[1-9][\d]{0,15}$/;
  }
}
```

## Styling

The library uses Tailwind CSS for styling. All components are fully customizable through className props and follow Tailwind's design system.

### Custom Styling

```tsx
<ValidatedInput
  name="email"
  label="Email"
  className="border-2 border-blue-300 focus:border-blue-500"
  errorClassName="text-red-700 font-bold"
  successClassName="text-green-700 font-bold"
/>
```

## Examples

### Registration Form

```tsx
import {
  ValidatedForm,
  ValidatedInput,
  SubmitButton,
} from "nextjs-validation-tailwind";
import { validationRules } from "nextjs-validation-tailwind/utils";

export default function RegistrationForm() {
  return (
    <ValidatedForm
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationRules={{
        firstName: { required: true, minLength: 2 },
        lastName: { required: true, minLength: 2 },
        email: validationRules.email,
        password: validationRules.password,
        confirmPassword: {
          required: true,
          custom: (value: any, allValues: any) => {
            return value === allValues.password ? null : "Passwords must match";
          },
        },
      }}
      onSubmit={async (values) => {
        // Handle registration
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ValidatedInput
          name="firstName"
          label="First Name"
          placeholder="John"
        />
        <ValidatedInput name="lastName" label="Last Name" placeholder="Doe" />
      </div>

      <ValidatedInput
        name="email"
        type="email"
        label="Email Address"
        placeholder="john@example.com"
      />

      <ValidatedInput
        name="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
      />

      <ValidatedInput
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Confirm your password"
      />

      <SubmitButton>Create Account</SubmitButton>
    </ValidatedForm>
  );
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Ahsan Alamgir** - [GitHub](https://github.com/ahsanalamgir14) - [Portfolio](https://ahsanalamgir.com/)

## Repository

**GitHub Repository:** [https://github.com/ahsanalamgir14/nextjs-tailwind-validation](https://github.com/ahsanalamgir14/nextjs-tailwind-validation)

---

Made with ❤️ for the Next.js community
