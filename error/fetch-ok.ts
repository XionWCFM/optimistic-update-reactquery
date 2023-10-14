import { FetchError } from './fetch-error';

export const fetchOk = (response: Response, data: any) => {
  const isFailed = !response.ok;
  if (isFailed) {
    throw new FetchError({
      status: response.status,
      message: data.error ?? `${response.status}}에러가 발생했습니다.`,
    });
  }
};
