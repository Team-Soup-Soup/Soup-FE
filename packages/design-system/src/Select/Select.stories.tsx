import type { Meta, StoryObj } from '@storybook/react';

import Select from './Select';
import React from 'react';

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Selected = () => {
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

  return <Select initValue="select" options={options} />;
};
