import React, { ReactNode } from 'react';
import './css/modal.css';
interface ModalProps {
  children?: ReactNode;
  active: boolean;
  setActive: (param: boolean) => void;
}
const Modal = function ({ children, active, setActive }: ModalProps) {
  return (
    <div
      className={active ? 'modal active' : 'modal'}
      onClick={() => {
        setActive(false);
      }}
    >
      <div
        className="modal__content"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
