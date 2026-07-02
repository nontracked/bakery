import './Rating.scss'
import Image from "next/image";

interface RatingProps {
  rate: number,

}

export const Rating = ({rate}: RatingProps) => {
  const maxRate = rate <= 5 && rate >= 0 ? rate : 5
  const fillPercentage = (maxRate / 5) * 100
  return (
    <div className="rating">
{/*      <div className="rating__stars">
        <Image className="rating__stars-opacity" src={} alt="Opacity star" />
        <div
          className="rating__stars-active"
          style={{width: `${fillPercentage + 1}%`}}
        >
          {[...Array(5)].map((_, index) => (
            <Image key={index} className="rating__star" src="" alt="Star" />
          ))}
        </div>
      </div>*/}
      <span className="rating__count">{rate}</span>
    </div>
  )
}