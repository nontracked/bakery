import './Rating.scss'
import Image from "next/image";
import {clsx} from "clsx";

interface RatingProps {
  rate: number,
  className?: string
}

export const Rating = ({rate, className}: RatingProps) => {
  return (
    <div className={clsx("rating", className)}>
      <span className="rating__count">{rate}</span>
      <Image src="/rating/rating.svg" alt="Rating Star" width={16} height={16} />
    </div>
  )
}