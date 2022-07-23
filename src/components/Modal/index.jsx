import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './index.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handelKeyUp);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handelKeyUp);
  }
  handelKeyUp = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props;
    return createPortal(
      <div
        id="CloseAnimateOverlay"
        className={s.Overlay}
        onClick={this.handleBackdropClick}
      >
        <div id="CloseAnimateModal" className={s.Modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}
Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default Modal;
