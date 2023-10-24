import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClientProvider, Hydrate } from '@tanstack/react-query';
import useQueryClientState from '@/hook/use-query-client-state';
import { Suspense, Suspensive, SuspensiveProvider } from '@suspensive/react';
import { QueryErrorBoundary } from '@suspensive/react-query';

const suspensive = new Suspensive({
  defaultOptions: {
    suspense: {
      fallback: <div>디폴트옵션</div>,
    },
  },
});
export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useQueryClientState();
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SuspensiveProvider value={suspensive}>
          <QueryErrorBoundary fallback={(props) => <div>hi error</div>}>
            <Suspense fallback={<div>서스펜시브 리액트 쿼리</div>}>
              <Component {...pageProps} />
            </Suspense>
          </QueryErrorBoundary>
        </SuspensiveProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
