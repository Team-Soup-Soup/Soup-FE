import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from './Checkbox';
import React, { useState } from 'react';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
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
    checkboxClassName: {
      description: 'checkbox classname',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    labelClassName: {
      description: 'label classname',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checked = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      id="name"
      label="이름"
      checked={checked}
      onChange={() => setChecked(!checked)}
    />
  );
};
