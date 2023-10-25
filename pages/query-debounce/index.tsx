import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSuspenseQuery } from '@suspensive/react-query';

import React, { useRef } from 'react';
import { MockApiType } from '../api/debounce';

interface indexProps {}

const Page = ({}: indexProps) => {
  const [another, setAnother] = React.useState(['another working']);
  const debounceState = useGetDebounceQuery();
  const debounceHandler = useDebouncingHandler(1000);
  const onClickHandler = () => {
    const date = new Date().getTime();
    const anotherContent = `it work for another${date}`;
    const debounceContent = `it work for debounce${date}`;
    setAnother([...another, anotherContent]);
    debounceHandler({ bodyData: debounceContent });
  };
  console.log(debounceState);
  return (
    <div className=" h-screen w-screen flex justify-center items-center">
      <button
        onClick={onClickHandler}
        className=" bg-purple-700 text-white px-12 py-3 rounded-full font-bold active:opacity-70
      "
      >
        요청을 디바운스 해봐요
      </button>
      <div className=" ml-12">
        <div className=" flex flex-col mt-24 bg-purple-300 rounded-lg px-24  py-12 mb-16">
          {another.map((item) => (
            <div className="" key={Math.random()}>
              {item}
            </div>
          ))}
        </div>
        <div className=" flex flex-col bg-red-300 rounded-lg px-24 py-12">
          {debounceState.data.map((item) => (
            <div className="" key={item}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;

type MutationArg = {
  bodyData: string;
};

const DEBOUNCE_QUERY_KEY_FACTORY = {
  ALL: 'debounce' as const,
};

const useDebounceMutation = () => {
  const queryClient = useQueryClient();
  const debouceMutation = useMutation<MockApiType, Error, MutationArg>({
    mutationFn: async ({ bodyData }: MutationArg) => {
      const response = await fetch(`http://localhost:3000/api/debounce`, {
        method: 'POST',
        body: JSON.stringify({ test: bodyData }),
        headers: {
          'Content-Type': `application/json`,
        },
      });
      const data = await response.json();
      return data;
    },
    onSettled: () => {
      queryClient.invalidateQueries([DEBOUNCE_QUERY_KEY_FACTORY.ALL]);
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
    [DEBOUNCE_QUERY_KEY_FACTORY.ALL],
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
