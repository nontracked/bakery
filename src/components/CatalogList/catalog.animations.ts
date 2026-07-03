import {Variants} from "framer-motion";

export const containerVariants: Variants = {
  hidden: {opacity: 0},
  show: {
    opacity: 1,
    transition: {
      // Это та самая задержка: каждая следующая карточка появляется на 0.05с позже
      staggerChildren: 0.05,
    },
  },
};
export const itemVariants: Variants = {
  hidden: {opacity: 0, y: 30},
  show: {
    opacity: 1,
    y: 0,
    transition: {type: "spring", stiffness: 300, damping: 24}
  },
}