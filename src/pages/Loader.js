import React from 'react';

export function Loader({ error, component }) {
  if (error) {
    return <div>Data loading error</div>;
  }

  return <component />;
}

export default Loader;
