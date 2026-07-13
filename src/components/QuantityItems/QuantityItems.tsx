import './QuantityItems.scss'
import {Button} from "@/ui/Button";

interface Props {
  onIncrease: () => void;
  onDecrease: () => void;
  quantity: number;
}

export const QuantityItems = ({onIncrease, onDecrease, quantity}: Props) => {
  return (
    <div className="quantity-items">
      <div className="quantity-items__inner">
        <Button className="quantity__button quantity__button--degrease" label="-" onClick={onDecrease} />
        <span>{quantity}</span>
        <Button className="quantity__button quantity__button--increase" label="+" onClick={onIncrease} />
      </div>
    </div>
  )
}