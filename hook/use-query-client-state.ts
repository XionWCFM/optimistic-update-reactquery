import { QueryClient } from '@tanstack/react-query';
import React from 'react';

const useQueryClientState = () => {
  const [queryClient] = React.useState(() => new QueryClient());
  return [queryClient];
};

export default useQueryClientState;
