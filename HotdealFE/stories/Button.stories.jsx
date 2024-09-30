import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from '@/components/common_refactoring/Button';

export default {
  title: 'Components/common/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: '버튼에 들어갈 내용',
    },
    color: {
      description: '버튼 스타일',
      options: ['primary', 'secondary'],
      control: {
        type: 'inline-radio'
      },
      table: {
        type: { summary: 'primary | secondary' },
      },
    },
    disabled: {
      description: '버튼 비활성화 여부',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    size: {
      description: '버튼 크기',
      options: ['large', 'medium', 'small'],
      control: {
        type: 'inline-radio',
      },
      table: {
        type: { summary: 'large | medium | small' },
      },
    },
  },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Button',
  color: 'primary',
  disabled: false,
  size: 'large',
  onClick: action('onClick'),
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
  color: 'secondary',
  disabled: false,
  size: 'medium',
  onClick: action('onClick'),
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Button',
  color: 'secondary',
  disabled: true,
  size: 'medium',
  onClick: action('onClick'),
};