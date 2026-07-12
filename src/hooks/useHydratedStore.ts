import {useEffect, useState} from "react";

export const useHydratedStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F // получаем сырые данные из стора
  const [data, setData] = useState<F>()
  useEffect(() => { // эффект сработает только в браузере (на клиенте)
    setData(result)
  }, [result]);
  return data
}