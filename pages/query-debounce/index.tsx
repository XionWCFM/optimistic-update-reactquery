import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSuspenseQuery } from '@suspensive/react-query';

import React from 'react';

interface indexProps {}

const Page = ({}: indexProps) => {
  const debounceState = useGetDebounceQuery();
  const debounceMutation = useDebounceMutation();
  console.log(debounceState);
  return (
    <div className=" h-screen w-screen flex justify-center items-center">
      <div className=" flex flex-col">dsadsa</div>
      <button onClick={() => {}}></button>
    </div>
  );
};

export default Page;

const DEBOUNCE_QUERY_KEY_FACTORY = {
  DEFAULT: 'debounce' as const,
};

const useDebounceMutation = () => {
  const debouceMutation = useMutation({
    mutationFn: async ({ bodyData }: { bodyData: string }) => {
      const response = await fetch(`/api/debounce`, {
        method: 'POST',
        body: JSON.stringify({ test: bodyData }),
      });
      const data = await response.json();
      return data;
    },
  });
  return debouceMutation;
};

const useGetDebounceQuery = () => {
  const debounceQuery = useSuspenseQuery(
    [DEBOUNCE_QUERY_KEY_FACTORY.DEFAULT],
    async () => {
      const response = await fetch(`http://localhost:3000/api/debounce`);
      const data = response.json();
      return data;
    },
  );
  return debounceQuery;
};
