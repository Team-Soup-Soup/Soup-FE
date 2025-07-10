import { cn } from '@soup/utils';
import React, {
  type MouseEvent,
  type PropsWithChildren,
  useEffect,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { useModal } from '../hooks';
import type { ModalItem } from '../types';

interface ModalProps
  extends PropsWithChildren,
    VariantProps<typeof ModalVariants> {
  modalKey: ModalItem;
  title?: string;
  className?: string;
  coloredBg?: boolean;
}
interface ModalHeaderProps
  extends PropsWithChildren,
    VariantProps<typeof ModalHeaderVariants> {
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

const ModalVariants = cva(
  'border-main-board-border scrollbar-hide flex min-w-[500px] flex-col rounded-[20px] border-[1px] bg-white',
  {
    variants: {
      intent: {
        home: 'border-m text-m hover:bg-m-hover active:bg-m-hover border-[1px]',
        primary: 'px-[40px] pb-[20px] min-h-[196px]',
        disabled: 'bg-[#D8D8D8] text-white',
        loginFailed: 'bg-white',
      },
      size: {
        sm: 'h-[196px] p-[30px]',
        md: 'h-fit px-[40px] pb-[30px]',
        lg: 'h-[85%]',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  },
);

const ModalHeaderVariants = cva(
  'mb-[17px] flex flex-shrink-0 place-items-start items-center text-start',
  {
    variants: {
      intent: {
        primary: 'h-[64px] text-light',
        loginFailed: 'h-fit text-dark font-extralight',
      },
    },
    defaultVariants: {
      intent: 'primary',
    },
  },
);

export default function Modal({
  intent,
  modalKey,
  className,
  children,
  coloredBg = true,
  size,
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

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal(modalKey);
    }
  };

  return (
    <div
      id={modalKey}
      className={cn(
        'bg-black/12.5 fixed inset-0 z-30 flex items-center justify-center',
        coloredBg ? 'bg-black/12.5' : 'bg-transparent',
      )}
      onClick={handleBackdropClick}
    >
      <div
        className={cn(
          ModalVariants({ size, intent }),
          className,
          coloredBg ? 'box-shadow' : 'box-shadow-4',
        )}
      >
        {children}
      </div>
    </div>
  );
}

function ModalHeader({ intent, title, className, children }: ModalHeaderProps) {
  return (
    <>
      <p className={cn(ModalHeaderVariants({ intent }), className)}>{title}</p>
      {children}
    </>
  );
}
function ModalBody({ className, children }: ModalBodyProps) {
  return (
    <div className={cn('flex size-full flex-col', className)}>{children}</div>
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
  return <div className={cn('flex', className)}>{children}</div>;
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
