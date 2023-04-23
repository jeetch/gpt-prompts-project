"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface UserModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const UserModal: FC<UserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  footer,
  actionLabel,
  disabled,
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

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="backdrop-blur-sm bg-sky-900/10  justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 
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
              <div className="flex items-center pt-6 rounded-t justify-center relative border-b-[1x]">
                <button
                  onClick={handleClose}
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9 text-neutral-500"
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold text-emerald-400">
                  {title}
                </div>
              </div>

              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserModal;
