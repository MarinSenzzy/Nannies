import { useEffect, type ReactNode, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import img from '../../assets/icons.svg';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
const modalRoot = document.getElementById('modal-root');

export function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !modalRoot) return null;

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button type="button" className={css.closeBtn} onClick={onClose}>
          <svg width="32" height="32" className={css.closeIcon}>
            <use href={`${img}#icon-close`} />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}
