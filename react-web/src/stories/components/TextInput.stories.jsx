import React from 'react';

import TextInput  from '@/app/components/TextInput';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/TextInput',
  component: TextInput,
  tags: ['autodocs'],
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <TextInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "label",
  placeholder: "placeholder",
};