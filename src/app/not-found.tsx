'use client'
import Image from "next/image";
import {useRouter} from "next/navigation";

export default function NotFound() {
  const router = useRouter()
  return (
    <main className="not-found">
      <div className="not-found__inner container">
        <Image className="not-found__image" src="/404/01.jpg" alt="Not Found page" width={800} height={500} />
        <button className="not-found__button button" type="button" onClick={() => router.replace('/')}>
          Back To Main Page
        </button>
      </div>
    </main>
  )
}