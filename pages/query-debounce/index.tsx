import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';

interface indexProps {}

const Page = ({}: indexProps) => {
  return <div>index</div>;
};

export default Page;

const useDebounceMutation = () => {
  const debouceMutation = useMutation({
    mutationFn: async ({ bodyData }: { bodyData: string }) => {
      const response = await fetch(`/api/debounce`, {
        method: 'POST',
        body: JSON.stringify({ test: bodyData }),
      });
    },
  });
  return debouceMutation;
};

