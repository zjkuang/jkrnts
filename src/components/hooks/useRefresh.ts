import React from 'react';

export const useRefresh = () => {
  const [flag, setFlag] = React.useState(false);
  return React.useCallback(() => {
    setFlag(!flag);
  }, [flag]);
};
