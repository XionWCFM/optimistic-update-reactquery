'use client';
import React from 'react';
import { useRef } from 'react';

interface indexProps {}

const Page = ({}: indexProps) => {
  const buttonHandler = () => {
    console.log('실제로 눌린 횟수');
    realMutation();
  };

  const realMutation = useDebounce(() => {
    console.log('계속 디바운싱되다가 실행');
  }, 500);

  return (
    <div className=" flex h-screen w-screen justify-center items-center">
      <button onClick={buttonHandler}>누르는버튼</button>
    </div>
  );
};

export default Page;

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
