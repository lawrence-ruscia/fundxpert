import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';

export default function LoginForm({ className, ...props }) {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // For visual error state tracking
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const [customErrors, setCustomErrors] = useState({
    email: '',
    password: '',
    form: '',
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear form error when typing
    if (customErrors.form) {
      setCustomErrors((prev) => ({ ...prev, form: '' }));
    }

    // If field has been touched, check validity for visual feedback
    if (touched[name]) {
      updateValidityState(name);
    }
  }

  function handleBlur(event) {
    const { name } = event.target;

    // Mark field as touched
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Update visual error state based on HTML5 validity
    updateValidityState(name);
  }

  function updateValidityState(fieldName) {
    const element = formRef.current.elements[fieldName];
    const message = element.validationMessage;

    setCustomErrors((prev) => ({
      ...prev,
      [fieldName]: message,
    }));
  }

  async function onSubmit(event) {
    event.preventDefault();

    // Let the form handle validation first
    const form = formRef.current;

    if (!form.checkValidity()) {
      setTouched({
        email: true,
        password: true,
      });

      // Update error states for all fields
      Array.from(form.elements).forEach((element) => {
        if (
          element.name &&
          (element.name === 'email' || element.name === 'password')
        ) {
          setCustomErrors((prev) => ({
            ...prev,
            [element.name]: element.validationMessage,
          }));
        }
      });

      return;
    }

    try {
      // Clear any previous form errors
      setCustomErrors((prev) => ({ ...prev, form: '' }));

      // Authenticate login using mock data
      await login(formData.email, formData.password);
      navigate('/app/dashboard'); // Route for dashboard
    } catch (error) {
      console.error('Login error:', error);
      setCustomErrors((prev) => ({
        ...prev,
        form: error.message || 'Invalid email or password',
      }));
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='flex flex-col items-center'>
          <CardTitle className='text-xl'>Welcome Back</CardTitle>
          <CardDescription>
            Enter your company email to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            ref={formRef}
            onSubmit={onSubmit}
            className='flex flex-col gap-4 max-w-3xl mx-auto'
            noValidate
          >
            {customErrors.form && (
              <div className='p-3 text-sm font-medium text-red-500 bg-red-50 rounded-md mb-2'>
                {customErrors.form}
              </div>
            )}

            <div>
              <div className='space-y-2'>
                <label
                  id='emailLabel'
                  htmlFor='email'
                  className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                    customErrors.email && touched.email ? 'text-red-500' : ''
                  }`}
                >
                  Company Email *
                </label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='johndoe@metrobank.ph'
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`mt-1 ${
                    customErrors.email && touched.email ? 'border-red-500' : ''
                  }`}
                  required
                />
                {customErrors.email && touched.email && (
                  <p className='text-sm font-medium text-red-500'>
                    {customErrors.email}
                  </p>
                )}
              </div>
            </div>
            <div>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <label
                    htmlFor='password'
                    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                      customErrors.password && touched.password
                        ? 'text-red-500'
                        : ''
                    }`}
                  >
                    Password *
                  </label>
                  <a
                    href='#'
                    className='ml-auto inline-block text-sm underline-offset-4 hover:text-primary hover:underline '
                  >
                    Forgot your password?
                  </a>
                </div>

                <PasswordInput
                  id='password'
                  name='password'
                  placeholder='●●●●●'
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`mt-1 ${
                    customErrors.password && touched.password
                      ? 'border-red-500'
                      : ''
                  }`}
                  required
                />
                {customErrors.password && touched.password && (
                  <p className='text-sm font-medium text-red-500'>
                    {customErrors.password}
                  </p>
                )}
              </div>
            </div>
            <Button className='w-full mt-1.5' type='submit'>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  '>
        By clicking continue, you agree to our{' '}
        <a
          href='https://web-assets.metrobank.com.ph/1661480202-mbos-ebtc-as-of-sept-2021.pdf'
          target='_blank'
          rel='noopener noreferrer'
        >
          Terms of Use
        </a>
        ,{' '}
        <a
          href='https://www.metrobank.com.ph/articles/privacy-notice'
          target='_blank'
          rel='noopener noreferrer'
        >
          Privacy Policy
        </a>
        , and{' '}
        <a
          href='https://web-assets.metrobank.com.ph/1661480290-mbos-security-features.pdf'
          target='_blank'
          rel='noopener noreferrer'
        >
          Security Features
        </a>
        .
      </div>
    </div>
  );
}
