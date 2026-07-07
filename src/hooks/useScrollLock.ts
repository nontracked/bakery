import {useEffect} from "react";

export const useScrollLock = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = '15px'
    return () => {
      document.body.style.overflow = 'auto'
      document.body.style.paddingRight = '0'
    }
  }, []);
}