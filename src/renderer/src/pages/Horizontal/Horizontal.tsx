import {Outlet} from "react-router-dom";
// import classes from './Horizontal.module.scss'
import HorizontalNavigation from "../../components/ui/navigation/horizontalNavigation/HorizontalNavigation";

const Horizontal = () => {

  return (
    <div>
      <HorizontalNavigation/>
      <>
        <Outlet/>
      </>
    </div>
  );
};

export default Horizontal;
