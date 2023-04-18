"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const SearchModalContainer: FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="  backdrop-blur-sm bg-sky-900/10 justify-center bg-blur items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 
    outline-none focus:outline-none"
      >
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-auto lg:h-auto md:h-auto">
          {/* CONTENT */}
          <div
            className={`transalte duration-300 h-full ${
              showModal ? "translate-y-0" : "translate-y-full"
            }
            ${showModal ? "opacity-100" : "opacity-0"}`}
          >
            <div
              className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative 
            flex flex-col w-full bg-sky-800 outline-none focus:outline-none"
            >
              {/* HEADER */}

              <button
                onClick={handleClose}
                className="z-10 p-1 border-0 hover:opacity-70 transition absolute right-1 text-neutral-500"
              >
                <IoMdClose size={18} />
              </button>

              {/* BODY */}
              <div className="relative p-4 flex-auto">{body}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModalContainer;
