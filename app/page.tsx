'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    emailOrRoll: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    emailOrRoll: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Validation
  const validateForm = () => {
    const newErrors = { emailOrRoll: '', password: '' };
    let isValid = true;

    if (!formData.emailOrRoll.trim()) {
      newErrors.emailOrRoll = 'Please enter your roll number or email.';
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Please enter your password.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Handle form submission (mock - navigates to role-specific dashboard)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate auth delay
    setTimeout(() => {
      // For mock: extract role from email or roll number
      // Examples: TN_CUET_001 (student), TN_MGR_001 (manager), etc.
      const roll = formData.emailOrRoll.toLowerCase();
      let role = 'student'; // default

      if (roll.includes('mgr')) role = 'manager';
      if (roll.includes('fellow')) role = 'fellow';
      if (roll.includes('admin')) role = 'admin';

      // Store mock session
      localStorage.setItem('mockRole', role);
      localStorage.setItem('mockUser', formData.emailOrRoll);

      // Navigate to role dashboard
      if (role === 'student') {
        router.push('/student/dashboard');
      } else if (role === 'manager') {
        router.push('/manager/dashboard');
      } else if (role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push(`/${role}`);
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8">
        {/* Logo (use public/logo.png) */}
        <div className="flex justify-center mb-6">
          <div className="text-center">
            <img src="/logo.png" alt="OpenGrad Logo" className="mx-auto w-32 h-auto" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">
          Welcome back
        </h1>

        {/* Subheading */}
        <p className="text-center text-gray-600 text-sm sm:text-base mb-8">
          Enter your details to access your learning portal
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email/Roll Field */}
          <div className="field-wrapper">
            <label htmlFor="emailOrRoll" className="field-label">
              Email or Roll Number
            </label>
            <input
              id="emailOrRoll"
              name="emailOrRoll"
              type="text"
              placeholder="name@opengrad.edu or OG-STU-001"
              value={formData.emailOrRoll}
              onChange={handleChange}
              disabled={isLoading}
              className="input-field"
              aria-label="Email or Roll Number"
              aria-describedby={errors.emailOrRoll ? 'error-email' : undefined}
              autoComplete="username"
            />
            {errors.emailOrRoll && (
              <div id="error-email" className="error-text">
                {errors.emailOrRoll}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="field-wrapper">
            <label htmlFor="password" className="field-label">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className="input-field pr-10"
                aria-label="Password"
                aria-describedby={errors.password ? 'error-password' : undefined}
                autoComplete="current-password"
              />
              {/* Show/Hide Password Toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                disabled={isLoading}
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <div id="error-password" className="error-text">
                {errors.password}
              </div>
            )}
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="button-primary mt-6 bg-green-600"
          >
            {isLoading ? 'Signing in...' : 'Sign In to Platform'}
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="text-center mt-6">
          <button
            type="button"
            className="text-sm text-teal-600 hover:text-teal-700 hover:underline focus:outline-none focus:underline"
            disabled={isLoading}
            onClick={() => {
              alert('Password recovery feature not available in this mock demo.');
            }}
          >
            Forgot password?
          </button>
        </div>

        {/* end card footer */}
      </div>
    </div>
  );
}
