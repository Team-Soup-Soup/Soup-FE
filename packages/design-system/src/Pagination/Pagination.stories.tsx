import type { Meta, StoryObj } from '@storybook/react';

import Pagination from './Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    current: {
      description: 'current page',
      control: 'number',
      table: {
        type: { summary: 'number' },
      },
    },
    total: {
      description: 'total items count',
      control: 'number',
      table: {
        type: { summary: 'number' },
      },
    },
    showPage: {
      description: 'show page count',
      control: 'number',
      table: {
        type: { summary: 'number' },
      },
    },
    showItem: {
      description: 'show item count',
      control: 'number',
      table: {
        type: { summary: 'number' },
      },
    },
    onChange: {
      description: 'Is button loading',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    className: {
      description: 'className',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const pagination: Story = {
  args: {
    current: 1,
    total: 60,
    showPage: 5,
    showItem: 10,
    onChange: (page) => console.log('Page : ', page),
  },
};
