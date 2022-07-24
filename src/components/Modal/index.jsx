import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './index.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClose, largeImageURL, tags }) {
  useEffect(() => {
    window.addEventListener('keydown', handelKeyUp);
    return () => {
      window.removeEventListener('keydown', handelKeyUp);
    };
  },[onClose]);

  const handelKeyUp = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return createPortal(
    <div
      id="CloseAnimateOverlay"
      className={s.Overlay}
      onClick={handleBackdropClick}
    >
      <div id="CloseAnimateModal" className={s.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default Modal;
