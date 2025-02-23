import { cn } from '@soup/utils';
import React, { PropsWithChildren, useEffect } from 'react';

interface ModalProps extends PropsWithChildren {
  title?: string;
  className?: string;
  closeModal: () => void;
}

interface ModalBodyProps extends PropsWithChildren {
  className?: string;
}

export default function Modal({
  title,
  className,
  closeModal,
  children,
}: ModalProps) {
  useEffect(() => {
    const escKeyModalClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        console.log('esc');
        closeModal();
      }
    };
    document.addEventListener('keydown', escKeyModalClose);

    return () => document.removeEventListener('keydown', escKeyModalClose);
  }, [closeModal]);

  return (
    <div
      className={cn(
        'bg-black/12.5 fixed inset-0 z-30 flex items-center justify-center',
      )}
    >
      <div
        className={cn(
          'border-main-board-border box-shadow min-h-[196px] min-w-[500px] rounded-[20px] bg-white px-[40px] pb-[20px]',
          className,
        )}
      >
        {title && (
          <p className="text-light place-items-start py-[20px] text-start">
            {title}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}

function ModalBody({ className, children }: ModalBodyProps) {
  return (
    <div
      className={cn('flex min-h-[176px] flex-col justify-between', className)}
    >
      {children}
    </div>
  );
}

Modal.Body = ModalBody;

Modal.displayName = 'Modal';
ModalBody.displayName = 'ModalBody';
