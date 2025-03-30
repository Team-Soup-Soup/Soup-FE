import React from 'react';
import { Toggle } from '@soup/design-system';
import { Control, Controller } from 'react-hook-form';
import type { AlarmSettingItem } from '~/shared/types';

interface ToggleControllerProps {
  label: string;
  name: keyof AlarmSettingItem;
  control: Control<AlarmSettingItem>;
  id: string;
}

const ToggleController = ({
  label,
  name,
  control,
  id,
}: ToggleControllerProps) => {
  return (
    <div className="text-md flex w-full justify-between">
      <p>{label}</p>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Toggle
            id={id}
            checked={Boolean(field.value)}
            onChange={field.onChange}
          />
        )}
      />
    </div>
  );
};

export default ToggleController;
