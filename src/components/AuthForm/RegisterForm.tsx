import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema, type RegisterFormData } from '../../schemas/authSchemas';
import { registerUser } from '../../services/authService';
import { Modal } from '../Modal/Modal';
import toast from 'react-hot-toast';
import css from './AuthForm.module.css';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data.email, data.password, data.name);
      reset();
      onClose();
      toast.success(`Welcome, ${data.name}! Registration successful.`);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to register. Email might be in use.';
      toast.error(errorMessage);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className={css.title}>Registration</h2>
      <p className={css.subtitle}>
        Thank you for your interest in our service! Please fill in the data.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.imputWrapp}>
          <div className={css.inputGroup}>
            <input
              {...register('name')}
              placeholder="Name"
              className={`${css.input} ${errors.name ? css.inputError : ''}`}
            />
            {errors.name && <p className={css.errorText}>{errors.name.message}</p>}
          </div>
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
        {/* {errors.root && <p className={css.rootError}>{errors.root.message}</p>} */}

        <button type="submit" disabled={isSubmitting} className={css.submitBtn}>
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </Modal>
  );
}
