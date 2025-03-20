import { useEffect } from "react";
import ReactDOM from "react-dom";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="container">
      <div
        className="fixed w-full h-full bg-[rgba(0,0,0,0.05)] overflow-hidden z-[999] left-0 top-0"
        onClick={onClose}
        aria-hidden={!isOpen}
      >
        <div className="flex justify-center items-center w-full min-h-full left-0 top-0 ">
          <div
            className="rounded-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="close-popup-button"
              className="bg-inherit text-[black] text-2xl border-[none] absolute right-5 top-5"
              onClick={onClose}
            >
              <IoMdClose />
            </button>
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
