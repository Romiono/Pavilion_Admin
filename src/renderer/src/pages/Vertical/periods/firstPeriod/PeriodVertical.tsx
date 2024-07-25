import {useEffect} from "react";
import {useAppDispatch} from "../../../../hooks/redux/useTypedRedux";
import {getEntity} from "../../../../store/slices/verticalEntitySlice";

interface PeriodVertical {
  period: number
}

const PeriodVertical = ({period}: PeriodVertical) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getEntity(period))
  }, [])
  return (
    <div>
      период вертикальный
    </div>
  );
};

export default PeriodVertical;
