import './CatalogError.scss'
import Image from "next/image";
import {RetryButton} from "@/components/RetryButton";

export const CatalogError = () => {
  return (
    <div className="catalog-error">
      <div className="catalog-error__info">
        <span>Try again</span>
        <RetryButton />
      </div>
      <Image
        className="catalog-error__image"
        src="/catalogError/01.jpg" alt='Error image'
        width={816}
        height={936}
      />
    </div>
  )
}