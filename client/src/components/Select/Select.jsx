import React from 'react';

export default function Select({
  value,
  onChange,
  children
}) {
  return (
    <select
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
  );
};
