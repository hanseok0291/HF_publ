/** @type { import('@storybook/react').Preview } */

import '../styles/global.css'

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, context) => (
      <Story {...context} />
    )
  ]
};

export default preview;
