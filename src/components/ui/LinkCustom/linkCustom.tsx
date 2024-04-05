import { Colors } from '@/utils/constants/colors';
import Link, { LinkProps } from 'next/link';
import React from 'react';

interface ILinkCustomProps extends LinkProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const LinkCustom: React.FC<ILinkCustomProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <Link
      {...props}
      style={{ textDecoration: 'none', color: Colors.TEXT_WHITE, ...style }}
    >
      {children}
    </Link>
  );
};
