import React from 'react';

function LogItem(item) {
  return (
    <li key={item.name}>{item.name} has {item.views} views.</li>
  );
};

export default function LogReport({ pages }) {
  return (
    <ul>
      {pages.map(LogItem)}
    </ul>
  );
};
