import React, { memo, ReactNode, useEffect, useRef, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

interface Props {
  children: ReactNode;
  text: string;
  className?: string;
}

const Modal = memo(({ text, children, className }: Props) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const detectOutsideRef = useDetectClickOutside({
    onTriggered: () => setIsModalOpen(false),
  });

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        type="button"
        className="link"
        onClick={() => setTimeout(() => setIsModalOpen(true), 10)}
      >
        {text}
      </button>
      <dialog ref={modalRef} className="modal" onKeyDown={handleKeyDown}>
        <div ref={detectOutsideRef} className={`modal-box ${className}`}>
          {children}
        </div>
      </dialog>
    </>
  );
});

export default Modal;
