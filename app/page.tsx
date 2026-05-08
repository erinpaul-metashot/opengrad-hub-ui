'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PwaInstallBanner from '@/components/PwaInstallBanner';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const roll = formData.emailOrRoll.toLowerCase();
      let role = 'student';

      if (roll.includes('mgr')) role = 'manager';
      if (roll.includes('fellow')) role = 'fellow';
      if (roll.includes('admin')) role = 'admin';

      localStorage.setItem('mockRole', role);
      localStorage.setItem('mockUser', formData.emailOrRoll);

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
    <div className="min-h-[100dvh] bg-[radial-gradient(circle_at_top,_rgba(10,190,98,0.14),_transparent_40%),linear-gradient(180deg,_#f7fcfc_0%,_#eef5f5_100%)] px-4 py-[calc(1.25rem+var(--safe-top))]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 pb-[calc(1.5rem+var(--safe-bottom))] lg:flex-row lg:items-center lg:justify-center lg:gap-8">
        <section className="hidden flex-1 rounded-[32px] border border-teal-100/80 bg-[#034852] p-8 text-white shadow-[0_28px_70px_-34px_rgba(3,72,82,0.65)] lg:block">
          <div className="inline-flex rounded-full bg-white/12 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-teal-100">
            OpenGrad Mobile Mock
          </div>
          <h1 className="mt-5 max-w-md text-4xl font-bold leading-tight">
            Install the LMS mock and use it like a focused mobile app.
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-7 text-teal-50/90">
            This PWA pass keeps the experience frontend-only, fast to relaunch,
            and easier to demo on Android and iOS without layering in backend
            dependencies.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/12 bg-white/8 p-4">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-100/80">
                Installable
              </p>
              <p className="mt-2 text-sm text-white/90">
                Home screen launch, standalone window, branded icons.
              </p>
            </div>
            <div className="rounded-3xl border border-white/12 bg-white/8 p-4">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-100/80">
                Mock-safe
              </p>
              <p className="mt-2 text-sm text-white/90">
                Interactive UI only, with shell-level offline resilience.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto w-full max-w-md lg:max-w-lg">
          <div className="w-full rounded-[28px] border border-white/80 bg-white/95 p-6 shadow-[0_26px_60px_-34px_rgba(15,23,42,0.35)] backdrop-blur sm:p-8">
            <div className="mb-6 flex justify-center">
              <div className="text-center">
                <Image
                  src="/logo.png"
                  alt="OpenGrad Logo"
                  width={144}
                  height={36}
                  className="mx-auto h-auto w-36"
                  priority
                />
              </div>
            </div>

            <h1 className="mb-2 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
              Welcome back
            </h1>

            <p className="mb-8 text-center text-sm text-gray-600 sm:text-base">
              Enter your details to access your learning portal
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-gray-500 transition hover:bg-slate-100 hover:text-gray-700 focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5"
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
                        className="h-5 w-5"
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

              <button
                type="submit"
                disabled={isLoading}
                className="button-primary mt-6 bg-[#209379] hover:bg-[#0d7b65] active:bg-[#095848]"
              >
                {isLoading ? 'Signing in...' : 'Sign In to Platform'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                className="text-sm text-teal-600 transition hover:text-teal-700 hover:underline focus:outline-none focus:underline"
                disabled={isLoading}
                onClick={() => {
                  alert(
                    'Password recovery feature not available in this mock demo.'
                  );
                }}
              >
                Forgot password?
              </button>
            </div>
          </div>

          <PwaInstallBanner />
        </div>
      </div>
    </div>
  );
}
