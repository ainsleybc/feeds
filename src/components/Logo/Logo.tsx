import React from 'react';

type SVGProps = {
  fill?: string;
  height?: string;
  width?: string;
};

export const Logo = ({ fill = '#fff', height, width }: SVGProps) => (
  <svg height={height} width={width} viewBox="0 0 37.8 43.6">
    <path
      d="M18.9 0l-4 2.3L4 8.6l-4 2.3V32.7L4 35l11 6.3 4 2.3 4-2.3L33.8 35l4-2.3V10.9l-4-2.3-10.9-6.3-4-2.3zM8 28.1V15.5l10.9-6.3 10.9 6.3v12.6l-10.9 6.3L8 28.1z"
      fill={fill}
    />
  </svg>
);
