import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSuspenseQuery } from '@suspensive/react-query';

import React, { useRef } from 'react';
import { MockApiType } from '../api/debounce';

interface indexProps {}

const Page = ({}: indexProps) => {
  const debounceState = useGetDebounceQuery();
  const debounceHandler = useDebouncingHandler();

  console.log(debounceState);
  return (
    <div className=" h-screen w-screen flex justify-center items-center">
      <div className=" flex flex-col">
        {debounceState.data.map((item) => (
          <div className="" key={item}>
            {item}
          </div>
        ))}
      </div>
      <button onClick={() => {}}></button>
    </div>
  );
};

export default Page;

type MutationArg = {
  bodyData: string;
};

const DEBOUNCE_QUERY_KEY_FACTORY = {
  DEFAULT: 'debounce' as const,
};

const useDebounceMutation = () => {
  const debouceMutation = useMutation<MockApiType, Error, MutationArg>({
    mutationFn: async ({ bodyData }: MutationArg) => {
      const response = await fetch(`http://localhost:3000/api/debounce`, {
        method: 'POST',
        body: JSON.stringify({ test: bodyData }),
      });
      const data = await response.json();
      return data;
    },
  });
  return debouceMutation;
};

const useDebouncingHandler = (debounceTime = 1000) => {
  const debounceMutation = useDebounceMutation();
  const requestDebouncing = useDebounce(({ bodyData }: MutationArg) => {
    debounceMutation.mutate({ bodyData });
  }, debounceTime);
  return requestDebouncing;
};

const useGetDebounceQuery = () => {
  const debounceQuery = useSuspenseQuery<MockApiType>(
    [DEBOUNCE_QUERY_KEY_FACTORY.DEFAULT],
    async () => {
      const response = await fetch(`http://localhost:3000/api/debounce`);
      const data = response.json();
      return data;
    },
  );
  return debounceQuery;
};

function useDebounce<T extends unknown[]>(
  callback: (...params: T) => void,
  time: number,
) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  return (...params: T) => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      callback(...params);
      timer.current = null;
    }, time);
  };
}
