'use client'
import './RetryButton.scss'
import {clsx} from "clsx";
import {RotateCw} from "lucide-react";
import {useRouter} from "next/navigation";
import {useTransition} from "react";

export const RetryButton = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const handleRetry = () => {
    startTransition(() => {
      router.refresh()
    })
  }
  return (
    <button
      className={clsx("tabs-error__retry", isPending && 'tabs-error__retry--disable')}
      onClick={handleRetry}
      type="button"
    >
      <RotateCw className={clsx(isPending && 'animate-spin')} strokeWidth={1.5} width={30} height={30} />
    </button>
  )
}