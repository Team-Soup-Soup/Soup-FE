import type { Meta, StoryObj } from '@storybook/react';

import Input from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Input label',
      control: 'text',
      table: {
        type: { summary: 'boolean' },
      },
    },
    isSearch: {
      description: 'Search input',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    label: '아이디',
    placeholder: '아이디를 입력해주세요',
    required: true,
  },
};

export const Search: Story = {
  args: {
    isSearch: true,
  },
};

export const Password: Story = {
  args: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력해주세요',
    required: true,
    type: 'password',
  },
};
