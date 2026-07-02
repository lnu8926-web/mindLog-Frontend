import type { Preview } from '@storybook/nextjs';
import { createElement } from 'react';

import '../src/app/globals.css';
import { QueryProvider } from '../src/providers/query-provider';
import { ThemeProvider } from '../src/providers/theme-provider';
import { ToastProvider } from '../src/shared/ui/toast';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'MindLog Canvas',
      values: [
        { name: 'MindLog Canvas', value: '#f8fafc' },
        { name: 'White', value: '#ffffff' },
        { name: 'Prime', value: '#1a222e' },
      ],
    },
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) =>
      createElement(
        'div',
        { style: { '--font-cormorant': '"Cormorant Garamond", Georgia, serif' } },
        createElement(
          ThemeProvider,
          null,
          createElement(
            QueryProvider,
            null,
            createElement(ToastProvider, null, createElement(Story))
          )
        )
      ),
  ],
};

export default preview;
