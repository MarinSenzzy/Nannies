import { Modal } from '../Modal/Modal';
import css from './AuthWarning.module.css';

interface AuthWarningProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

export function AuthWarning({ isOpen, onClose, onLoginClick }: AuthWarningProps) {
  const handleLoginClick = () => {
    onClose();
    onLoginClick();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.warningContent}>
        <h3 className={css.title}>Access is blocked</h3>

        <p className={css.text}>
          This option is available only to authorized users. Please log in to your account to add
          babysitters to your favorites.
        </p>

        <div className={css.actions}>
          <button type="button" className={css.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button type="button" className={css.loginBtn} onClick={handleLoginClick}>
            Log In
          </button>
        </div>
      </div>
    </Modal>
  );
}
