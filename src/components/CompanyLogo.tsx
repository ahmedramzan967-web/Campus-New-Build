import React, { useState } from 'react';
import { LOGO_URL, DRIVE_LOGO_URL, LOGO_ALT } from '../constants/branding';

export interface CompanyLogoProps {
  variant?: 'navbar' | 'footer' | 'header' | 'modal';
  className?: string;
  loading?: 'eager' | 'lazy';
  alt?: string;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  variant = 'navbar',
  className = '',
  loading = 'eager',
  alt = LOGO_ALT,
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(LOGO_URL);

  const handleError = () => {
    // If the primary image URL fails to load, swap to the Google Drive link as backup.
    // Crucially: never display text in place of the logo in the navbar.
    if (currentSrc !== DRIVE_LOGO_URL) {
      setCurrentSrc(DRIVE_LOGO_URL);
    }
  };

  // Sizing and styling rules:
  // - Navbar: height about 40-48px (h-10 sm:h-11 md:h-12), width auto, keep original proportions, never stretch or crop
  // - Transparent background: no background color, border, shadow, or filter behind the image
  // - Footer: slightly smaller (~34-38px), visible on dark slate footer
  let sizeClasses = 'h-10 sm:h-11 md:h-12 w-auto max-w-full object-contain';
  let visibilityClasses = 'transition-opacity duration-150 hover:opacity-95';

  if (variant === 'navbar') {
    sizeClasses = 'w-[104px] h-[82px] object-contain';
    visibilityClasses = 'transition-opacity duration-150 group-hover:opacity-95';
  } else if (variant === 'footer') {
    sizeClasses = 'h-8 sm:h-9 md:h-10 w-auto max-w-[200px] sm:max-w-none object-contain';
    visibilityClasses = 'brightness-0 invert opacity-95 group-hover:opacity-100 transition-opacity';
  } else if (variant === 'header' || variant === 'modal') {
    sizeClasses = 'h-9 sm:h-10 md:h-11 w-auto object-contain';
    visibilityClasses = 'transition-opacity';
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={handleError}
      className={`${sizeClasses} ${visibilityClasses} ${className}`}
      style={{
        imageRendering: 'auto',
        ...(variant === 'navbar' ? { width: '104px', height: '82px' } : {})
      }}
    />
  );
};

