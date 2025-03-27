import { cn } from '@soup/utils';
import React, { PropsWithChildren, useEffect } from 'react';
import { useModal } from '../hooks';
import type { ModalItem } from '../types';

interface ModalProps extends PropsWithChildren {
  modalKey: ModalItem;
  title?: string;
  className?: string;
  coloredBg?: boolean;
}
interface ModalHeaderProps extends PropsWithChildren {
  title: string;
  className?: string;
}
interface ModalBodyProps extends PropsWithChildren {
  className?: string;
}

interface ModalSectionProps extends PropsWithChildren {
  title?: string;
  description?: string;
  className?: string;
}
interface ModalFooterProps extends PropsWithChildren {
  className?: string;
}

export default function Modal({
  modalKey,
  className,
  children,
  coloredBg = true,
}: ModalProps) {
  const { closeModal } = useModal();

  useEffect(() => {
    const escKeyModalClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal(modalKey);
        console.log('Escape');
      }
    };
    document.addEventListener('keydown', escKeyModalClose);

    return () => document.removeEventListener('keydown', escKeyModalClose);
  }, [closeModal, modalKey]);

  return (
    <div
      id={modalKey}
      className={cn(
        'bg-black/12.5 fixed inset-0 z-30 flex items-center justify-center',
        coloredBg ? 'bg-black/12.5' : 'bg-transparent',
      )}
    >
      <div
        className={cn(
          'border-main-board-border min-h-[196px] min-w-[500px] rounded-[20px] border-[1px] bg-white px-[40px] pb-[20px]',
          className,
          coloredBg ? 'box-shadow' : 'box-shadow-4',
        )}
      >
        {children}
      </div>
    </div>
  );
}

function ModalHeader({ title, className, children }: ModalHeaderProps) {
  return (
    <>
      <p
        className={cn(
          'text-light place-items-start py-[20px] text-start',
          className,
        )}
      >
        {title}
      </p>
      {children}
    </>
  );
}
function ModalBody({ className, children }: ModalBodyProps) {
  return (
    <div
      className={cn('flex min-h-[124px] flex-col justify-between', className)}
    >
      {children}
    </div>
  );
}

function ModalSection({
  title,
  description,
  className,
  children,
}: ModalSectionProps) {
  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <div>
        {title && <p>{title}</p>}
        {description && <p className="text-light text-sm">{description}</p>}
      </div>
      {children}
    </div>
  );
}
function ModalFooter({ className, children }: ModalFooterProps) {
  return <div className={cn('mb-[16px] flex', className)}>{children}</div>;
}

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Section = ModalSection;
Modal.Footer = ModalFooter;

Modal.displayName = 'Modal';
ModalHeader.displayName = 'ModalHeader';
ModalBody.displayName = 'ModalBody';
ModalSection.displayName = 'ModalSection';
ModalFooter.displayName = 'ModalFooter';
