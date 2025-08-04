"use client";

import { ValidatedForm, ValidatedInput, SubmitButton, ResetButton, ErrorMessage, SuccessMessage } from '../lib/components';
import { validationRules } from '../lib/utils/validation';

export default function Home() {
  const handleContactSubmit = async (values: any) => {
    console.log('Contact form submitted:', values);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Contact form submitted successfully!');
  };

  const handleRegistrationSubmit = async (values: any) => {
    console.log('Registration form submitted:', values);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Registration successful!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            NextJS Validation Tailwind
          </h1>
          <p className="text-xl text-gray-600">
            A comprehensive validation library for Next.js with beautiful Tailwind CSS styling
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Form</h2>
            <p className="text-sm text-gray-600 mb-4">
              Try entering invalid data to see validation in action. Required fields: Name (2-50 chars), Email, Message (10-500 chars). Phone accepts international format.
            </p>
            
            <ValidatedForm
              initialValues={{
                name: '',
                email: '',
                phone: '',
                message: ''
              }}
              validationRules={{
                name: { required: true, minLength: 2, maxLength: 50 },
                email: { required: true, email: true },
                phone: { pattern: '^[\\+]?[1-9][\\d]{0,15}$' },
                message: { required: true, minLength: 10, maxLength: 500 }
              }}
              onSubmit={handleContactSubmit}
            >
              <ValidatedInput
                name="name"
                label="Full Name"
                placeholder="Enter your full name"
                required
              />
              
              <ValidatedInput
                name="email"
                type="email"
                label="Email Address"
                placeholder="john@example.com"
                required
              />
              
              <ValidatedInput
                name="phone"
                type="tel"
                label="Phone Number"
                placeholder="(555) 123-4567"
              />
              
              <ValidatedInput
                name="message"
                type="textarea"
                label="Message"
                placeholder="Enter your message here..."
                required
              />
              
              <div className="flex gap-4">
                <SubmitButton className="flex-1">Send Message</SubmitButton>
                <ResetButton className="flex-1">Reset</ResetButton>
              </div>
            </ValidatedForm>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Registration Form</h2>
            <p className="text-sm text-gray-600 mb-4">
              Test validation: Names (2-30 chars), Email, Password (8+ chars with uppercase, lowercase, number, special char), matching passwords, valid URL.
            </p>
            
            <ValidatedForm
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                website: ''
              }}
              validationRules={{
                firstName: { required: true, minLength: 2, maxLength: 30 },
                lastName: { required: true, minLength: 2, maxLength: 30 },
                email: { required: true, email: true },
                password: { 
                  required: true, 
                  minLength: 8,
                  pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]'
                },
                confirmPassword: {
                  required: true,
                  custom: (value: any, allValues: any) => {
                    return value === allValues.password ? null : 'Passwords must match';
                  }
                },
                website: { url: true }
              }}
              onSubmit={handleRegistrationSubmit}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ValidatedInput
                  name="firstName"
                  label="First Name"
                  placeholder="John"
                  required
                />
                <ValidatedInput
                  name="lastName"
                  label="Last Name"
                  placeholder="Doe"
                  required
                />
              </div>
              
              <ValidatedInput
                name="email"
                type="email"
                label="Email Address"
                placeholder="john@example.com"
                required
              />
              
              <ValidatedInput
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                required
              />
              
              <ValidatedInput
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                required
              />
              
              <ValidatedInput
                name="website"
                type="url"
                label="Website (Optional)"
                placeholder="https://example.com"
              />
              
              <SubmitButton>Create Account</SubmitButton>
            </ValidatedForm>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">TypeScript First</h3>
              <p className="text-gray-600">Full TypeScript support with comprehensive type definitions</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M15 7l3-3m0 0h-3m3 0v3" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Tailwind Styled</h3>
              <p className="text-gray-600">Beautiful, responsive components with Tailwind CSS</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">React Hooks</h3>
              <p className="text-gray-600">Modern React hooks for form management and validation</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Flexible Validation</h3>
              <p className="text-gray-600">Custom validation rules with built-in common validators</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Responsive Design</h3>
              <p className="text-gray-600">Mobile-first responsive components</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Performance Optimized</h3>
              <p className="text-gray-600">Lightweight and fast with minimal bundle size</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Made with ❤️ by <a href="https://github.com/ahsanalamgir14" className="text-blue-600 hover:text-blue-800">Ahsan Alamgir</a>
          </p>
          <p className="text-sm text-gray-500">
            <a href="https://ahsanalamgir.com" className="hover:text-gray-700">Portfolio</a> • 
            <a href="https://github.com/ahsanalamgir14/nextjs-tailwind-validation" className="hover:text-gray-700 ml-2">GitHub</a>
          </p>
        </div>
      </div>
    </div>
  );
}
