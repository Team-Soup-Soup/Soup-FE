import React from 'react';

import { cn } from '@soup/utils';

import { FormUnitProps } from '~/features/signup/types';
import { FORM, UserProperty } from '~/features/signup/model';
import { FormInput } from '~/features/signup/ui';

const Description = ({ content }: { content: string }) => (
  <p className="text-light mt-1 p-0 text-sm font-light">{content}</p>
);

export default function FormUnit({ id, errors, register }: FormUnitProps) {
  return (
    <div className="relative flex w-full flex-col items-start">
      <p
        className={cn(
          'font-light, text-important absolute top-[1px] text-sm',
          id === 'NAME' ? 'left-10' : 'left-18',
        )}
      >
        {errors[UserProperty[id]] && errors[UserProperty[id]]?.message}
      </p>
      <FormInput id={id} register={register} />
      <Description content={FORM[id].description || ''} />
    </div>
  );
}
