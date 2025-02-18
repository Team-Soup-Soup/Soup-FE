import type { Meta, StoryObj } from '@storybook/react';

import Radio from './Radio';
import React, { useState } from 'react';

const meta = {
  title: 'Components/Radio',
  component: Radio,
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
    radioClassname: {
      description: 'radio classname',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checked = () => {
  const [checked, setChecked] = useState<string>('');

  return (
    <div className="flex gap-4">
      <Radio
        id="option1"
        label="옵션 1"
        name="옵션"
        checked={checked === 'option1'}
        onChange={() => setChecked('option1')}
      />
      <Radio
        id="option2"
        label="옵션 2"
        name="옵션"
        checked={checked === 'option2'}
        onChange={() => setChecked('option2')}
      />
      <Radio
        id="option3"
        label="옵션 3"
        name="옵션"
        checked={checked === 'option3'}
        onChange={() => setChecked('option3')}
      />
    </div>
  );
};
