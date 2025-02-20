import type { StorybookConfig } from '@storybook/react-vite';
import path, { dirname, join } from 'path';

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/stories/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('storybook-addon-pseudo-states'),
  ],
  framework: getAbsolutePath('@storybook/react-vite'),
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) => {
    if (config && config.build) {
      config.build.outDir = path.resolve(__dirname, '../dist');
    }
    return config;
  },
};
export default config;
