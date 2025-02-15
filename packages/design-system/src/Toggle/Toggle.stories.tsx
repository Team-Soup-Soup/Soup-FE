import type { Meta, StoryObj } from '@storybook/react';

import Toggle from './Toggle';
import React, { useState } from 'react';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      description: 'Id',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      description: 'Label',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Toggled = () => {
  const [toggled, setToggled] = useState(false);

  return (
    <div className="flex gap-4">
      <Toggle
        id="toggle"
        label="토글"
        checked={toggled}
        onChange={() => setToggled(!toggled)}
      />
    </div>
  );
};
