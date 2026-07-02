import './TabButton.scss'
import {clsx} from "clsx";
import {motion} from 'framer-motion';
import {ButtonHTMLAttributes} from "react";

interface TabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  activeTab: string;
  id: string;
}

export const TabButton = ({label, activeTab, id, ...props}: TabButtonProps) => {
  const isActive = activeTab === id
  return (
    <button
      className={clsx("tab-button", isActive && "tab-button--active")}
      type="button"
      {...props}
    >
      <span className="tab-button__text">
        {label}
      </span>
      {isActive && (
        <motion.div
          className="tab-button__indicator" layoutId="active-tab-indicator"
          transition={{type: "spring", stiffness: 600, damping: 50}}
        />
      )}
    </button>
  )
}