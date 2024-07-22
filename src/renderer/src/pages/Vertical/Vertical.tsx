import HorizontalNavigation from "../../components/ui/navigation/horizontalNavigation/HorizontalNavigation";
import {Outlet} from "react-router-dom";

const Vertical = () => {
  return (
    <div>
      <HorizontalNavigation/>
      <>
        <Outlet/>
      </>
    </div>
  );
};

export default Vertical;
