import clsx from "clsx";
import classes from "./SimpleCard.module.scss"
import {ReactNode} from "react";

interface SimpleCard {
  className?: any
  variant?: "fill" | "outlined"
  width?: "1/2" | "full"
  height?: "auto" | "full"
  children: ReactNode
}

const SimpleCard = ({
                      className,
                      variant = "fill",
                      width = "full" ,
                      height = "auto",
                      children}: SimpleCard) => {
  return (
    <div className={clsx(className, classes.container, {
      [classes.fill]: variant === "fill",
      [classes.outlined]: variant === "outlined",
      [classes.full]: width === "full",
      [classes.fullHeight]: height === "full",
      [classes.autoHeight]: height === "auto",
      [classes.halfWidth]: width === "1/2",
    })}>
      {children}
    </div>
  );
};

export default SimpleCard;
