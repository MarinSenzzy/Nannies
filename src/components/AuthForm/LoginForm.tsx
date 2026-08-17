import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, type LoginFormData } from '../../schemas/authSchemas';
import { loginUser } from '../../services/authService';
import { Modal } from '../Modal/Modal';
import css from './AuthForm.module.css';
import toast from 'react-hot-toast';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
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
          <div className={css.inputGroup}>
            <input
              {...register('password')}
              type="password"
              placeholder="Password"
              className={`${css.input} ${errors.password ? css.inputError : ''}`}
            />
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
