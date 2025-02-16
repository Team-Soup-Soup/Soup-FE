import type { Meta, StoryObj } from '@storybook/react';

import Header from './Header';
import React from 'react';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const header = () => {
  return (
    <Header>
      <Header.Item>메인보드</Header.Item>
      <Header.Item>/</Header.Item>
      <Header.Item>세부페이지이름</Header.Item>
    </Header>
  );
};
