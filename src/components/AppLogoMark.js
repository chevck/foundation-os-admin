import React from 'react';

const iconSrc = `${process.env.PUBLIC_URL}/foundation-os-icon.svg`;

/**
 * Foundation OS mark from `public/foundation-os-icon.svg`.
 * @param {{ className?: string, size?: number }} props
 */
export function AppLogoMark({ className = 'h-9 w-9', size = 36 }) {
  return (
    <img
      src={iconSrc}
      alt=""
      width={size}
      height={size}
      className={`shrink-0 ${className}`.trim()}
      decoding="async"
    />
  );
}
