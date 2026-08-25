import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, type LoginFormData } from '../../schemas/authSchemas';
import { loginUser } from '../../services/authService';
import { Modal } from '../Modal/Modal';
import css from './AuthForm.module.css';
import toast from 'react-hot-toast';
import { useState } from 'react';
import img from '../../assets/icons.svg';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const userCredential = await loginUser(data.email, data.password);
      const userName = userCredential.displayName;
      reset();
      onClose();
      toast.success(`Welcome back, ${userName}!`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid email or password.';

      toast.error(errorMessage);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className={css.title}>Log In</h2>
      <p className={css.subtitle}>
        Welcome back! Please enter your credentials to access your account.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.imputWrapp}>
          {' '}
          <div className={css.inputGroup}>
            <input
              {...register('email')}
              type="email"
              placeholder="Email"
              className={`${css.input} ${errors.email ? css.inputError : ''}`}
            />
            {errors.email && <p className={css.errorText}>{errors.email.message}</p>}
          </div>
          <div className={`${css.inputGroup} ${css.passwordGroup}`}>
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className={`${css.input} ${errors.password ? css.inputError : ''}`}
            />
            <button
              type="button"
              className={css.eyeBtn}
              onClick={() => setShowPassword(prev => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <svg width="20" height="20" className={css.eyeIcon}>
                <use href={`${img}#${showPassword ? 'icon-eye' : 'icon-eye-off'}`} />
              </svg>
            </button>

            {errors.password && <p className={css.errorText}>{errors.password.message}</p>}
          </div>
        </div>
        <button type="submit" disabled={isSubmitting} className={css.submitBtn}>
          {isSubmitting ? 'Logging In...' : 'Log In'}
        </button>
      </form>
    </Modal>
  );
}
