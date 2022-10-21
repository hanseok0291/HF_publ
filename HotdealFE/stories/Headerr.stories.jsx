import React from 'react';

import { Header } from './Header';

export default {
  title: 'Example/Header',
  component: Header,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

const Template = (args) => <Header {...args} />;

export const LoggedInnn = Template.bind({});
LoggedInnn.args = {
  user: {
    name: 'Jane Doe',
  },
};

export const LoggedOuttt = Template.bind({});
LoggedOuttt.args = {};
