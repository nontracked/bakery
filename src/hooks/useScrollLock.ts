import {useEffect} from "react";
import {useIsMobile} from "@/hooks/useIsMobile";

export const useScrollLock = () => {
  const {isMobile} = useIsMobile()
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = isMobile ? '0px' : '15px'
    return () => {
      document.body.style.overflow = 'auto'
      document.body.style.paddingRight = '0px'
    }
  }, [isMobile]);
}