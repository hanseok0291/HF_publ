import React from 'react';

import Button  from '@/app/components/Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description:
        "버튼에 들어갈 내용",
    },
    color: {
      description:
        "버튼 스타일",
      options: ['primary', 'secondary'],
      control: {
        type: 'inline-radio',
      },
    },
    disable: {
      description:
        "버튼 비활성화 여부",
      table: {
        defaultValue: {
          summary: "false",
        },
      },
    },
    size: {
      description:
        "버튼 크기",
        control: {
          type: 'inline-radio',
          options: ['small', 'medium', 'large'],
        },
        table: {
          type: { summary: 'small | medium | large' },
        },
    },
  }
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Button',
  color: 'primary',
  disable: false,
  size: 'large',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
  color: 'secondary',
  disable: false,
  size: 'large',
};

export const Disable = Template.bind({});
Disable.args = {
  label: 'Button',
  color: 'secondary',
  disable: true,
  size: 'large',
};