import React from 'react';

import ToggleButton  from '@/app/components/ToggleButton';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  tags: ['autodocs'],
  argTypes: {

  }
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <ToggleButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};