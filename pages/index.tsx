import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { StateType } from './api/hello';
import { FetchError } from '@/error/fetch-error';
import { fetchOk } from '@/error/fetch-ok';

interface ContextType {
  previousData: StateType;
}

interface MutationArgument {
  dummy?: string;
}

export default function Home() {
  const queryClient = useQueryClient();
  const randomMutation = useMutation<
    StateType,
    FetchError,
    MutationArgument,
    ContextType
  >({
    mutationFn: async () => {
      const response = await fetch(`/api/hello`, {
        method: 'POST',
      });
      const data = await response.json();
      fetchOk(response, data);
      return data;
    },
    onMutate: async (data): Promise<{ previousData: StateType }> => {
      await queryClient.cancelQueries({ queryKey: ['random'] });
      const previousData = queryClient.getQueryData(['random']) as StateType;
      queryClient.setQueryData(['random'], () => {
        const optimisticData: StateType = {
          isOn: !previousData.isOn,
        };
        return optimisticData;
      });
      return { previousData };
    },
    onError: (err, variable, context) => {
      if (context !== undefined) {
        queryClient.setQueryData(['random'], context.previousData);
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['random'],
      });
    },
  });

  const randomQuery = useQuery<StateType>({
    queryFn: async () => {
      const response = await fetch(`/api/hello`);
      const data = await response.json();
      return data;
    },
    queryKey: ['random'],
  });

  if (randomQuery.isLoading || !randomQuery.data) {
    return <div className="">로딩중입니다.</div>;
  }

  const buttonHandler = () => {
    randomMutation.mutate({});
  };

  return (
    <main className=" flex justify-center items-center flex-col">
      <div
        className={` h-10 w-10 my-20 ${
          randomQuery.data.isOn ? 'bg-blue-700' : 'bg-red-700'
        }`}
      ></div>
      <button
        className=" px-4 py-2 rounded-lg text-white font-bold hover:opacity-80  bg-blue-600"
        onClick={buttonHandler}
      >
        뮤테이션 날리기
      </button>
    </main>
  );
}
