import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Package } from 'lucide-react';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Package className="h-5 w-5" />
        <span className="font-semibold">shopcn</span>
      </>
    ),
  },
  links: [
    {
      text: 'Documentation',
      url: '/docs',
    },
    {
      text: 'GitHub',
      url: 'https://github.com/atharvadeosthale/shopcn',
      external: true,
    },
  ],
};
