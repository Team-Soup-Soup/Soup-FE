import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';
import {
  DESIGN_SYSTEM_COLOR_VARIANT,
  DESIGN_SYSTEM_SIZE_VARIANT,
} from '../constants';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      description: 'Button color',
      control: { type: 'select' },
      options: DESIGN_SYSTEM_COLOR_VARIANT,
      table: {
        defaultValue: { summary: DESIGN_SYSTEM_COLOR_VARIANT[0] },
        type: { summary: 'string' },
      },
    },
    size: {
      description: 'Button size',
      control: { type: 'select' },
      options: DESIGN_SYSTEM_SIZE_VARIANT,
      table: {
        defaultValue: { summary: DESIGN_SYSTEM_SIZE_VARIANT[0] },
        type: { summary: 'string' },
      },
    },
    locked: {
      description: 'Is button locked',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    loading: {
      description: 'Is button loading',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Point: Story = {
  args: {
    children: '버튼',
    color: 'point',
  },
};
export const Sub: Story = {
  args: {
    children: '버튼',
    color: 'sub',
  },
};
export const Normal: Story = {
  args: {
    children: '버튼',
    color: 'normal',
  },
};
export const Locked: Story = {
  args: {
    children: '버튼',
    locked: true,
  },
};
export const Loading: Story = {
  args: {
    children: '버튼',
    loading: true,
  },
};

export const Colors: Story = {
  render: (args) => (
    <div className="space-x-2">
      {DESIGN_SYSTEM_COLOR_VARIANT.map((color) => (
        <Button key={color} color={color} {...args}>
          버튼
        </Button>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="space-x-2">
      {DESIGN_SYSTEM_SIZE_VARIANT.map((size) => (
        <Button key={size} size={size} {...args}>
          버튼
        </Button>
      ))}
    </div>
  ),
};

export const Hover: Story = {
  render: (args) => (
    <div className="space-x-2">
      <Button {...args}>버튼</Button>
      <Button color="sub" {...args}>
        버튼
      </Button>
      <Button color="normal" {...args}>
        버튼
      </Button>
      <Button locked {...args}>
        버튼
      </Button>
    </div>
  ),
};

Hover.parameters = { pseudo: { hover: true, color: 'sub' } };
