'use client'

import {useTransition} from 'react'
import {useRouter} from 'next/navigation'
import Image from 'next/image'
import clsx from 'clsx'
import {RotateCw} from 'lucide-react'

export default function GlobalError({error, reset,}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    // Для global-error.tsx обязательно нужны html и body
    <html lang="ru">
      <body>
        <div className="catalog-error">
          <div className="catalog-error__info">
            <span>Try again</span>
            {/* Передаем reset как пропс в твою кнопку */}
            <RetryButton onReset={reset} />
          </div>
          <Image
            className="catalog-error__image"
            src="/catalogError/01.jpg"
            alt="Error image"
            width={816}
            height={936}
          />
        </div>
      </body>
    </html>
  )
}

export const RetryButton = ({onReset}: { onReset: () => void }) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleRetry = () => {
    startTransition(() => {
      router.refresh()
      onReset()
    })
  }

  return (
    <button
      className={clsx("tabs-error__retry", isPending && 'tabs-error__retry--disable')}
      onClick={handleRetry}
      type="button"
      disabled={isPending}
    >
      <RotateCw
        className={clsx(isPending && 'animate-spin')}
        strokeWidth={1.5}
        width={30}
        height={30}
      />
    </button>
  )
}