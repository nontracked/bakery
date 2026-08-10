import {useSearchParams} from "next/navigation";
import {useEffect} from "react";
import {toast} from "sonner";


export const usePaymentCancelToast = () => {
  const searchParams = useSearchParams()
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (searchParams.has('canceled')) {
      timer = setTimeout(() => {
        toast.warning('Payment was cancelled', {className: 'custom-toast__checkout'})
        window.history.replaceState({}, '', '/checkout')
      }, 500)
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [searchParams]);
}