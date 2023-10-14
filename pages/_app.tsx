import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClientProvider, Hydrate } from '@tanstack/react-query';
import useQueryClientState from '@/hook/use-query-client-state';
export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useQueryClientState();
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}
