import {useEffect} from "react";
import {useIsMobile} from "@/hooks/useIsMobile";

let locks = 0

export const useScrollLock = (isLock: boolean) => {
  const {isMobile} = useIsMobile()
  useEffect(() => {
    if (isLock) {
      locks++
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = isMobile ? '0px' : `${scrollbarWidth}px`
    }
    return () => {
      if (isLock) {
        locks--
        if (locks === 0) {
          document.body.style.overflow = ''
          document.body.style.paddingRight = '0px'
        }
      }
    }
  }, [isMobile, isLock]);
}