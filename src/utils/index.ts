import { useEffect, useState } from "react";

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    //每次在value变化后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    //每次在上一个useEffect处理完以后再运行，这里是处理上一个timeout的函数
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};