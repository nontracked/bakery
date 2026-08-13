import {formatPrice} from "@/utils/formatPrice";
import {TAXES_VALUE} from "@/lib/constants";

interface Props {
  totalPrice: number,
  subTotalPrice: number,
  discountPercent: number
}

export const useReceiptMath = ({totalPrice, subTotalPrice, discountPercent}: Props) => {
  const totalPriceFormatted = formatPrice(totalPrice)
  const subTotalPriceFormatted = formatPrice(subTotalPrice)
  let discountSumFormatted = ''
  if (discountPercent) {
    const discountSum = Math.round(subTotalPrice * discountPercent / 100)
    discountSumFormatted = formatPrice(discountSum)
  }
  const serviceFee = subTotalPrice * TAXES_VALUE
  const serviceFeeFormatted = formatPrice(serviceFee)
  return {totalPriceFormatted, subTotalPriceFormatted, discountSumFormatted, serviceFeeFormatted}
}