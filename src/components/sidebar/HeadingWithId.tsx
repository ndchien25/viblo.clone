import createSlug from '@/utils/slug';
import React from 'react';

interface HeadingWithIdProps {
  level: number;
  children?: React.ReactNode;  // Ensure children are required
}

const HeadingWithId: React.FC<HeadingWithIdProps> = ({ level, children }) => {
  const text = typeof children === 'string' ? children : (children as any).props?.children || '';
  const id = createSlug(text);
  const HeaderTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <HeaderTag id={id}>
      {children}
    </HeaderTag>
  );
};

export default HeadingWithId;
