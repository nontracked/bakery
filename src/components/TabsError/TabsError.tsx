import './TabsError.scss'
import {RetryButton} from "@/components/RetryButton";

export const TabsError = () => {

  return (
    <div className="tabs-error">
      <span>Filter Loading Error</span>
      <RetryButton />
    </div>
  )
}