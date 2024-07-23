import SimpleCard from "../../../../components/ui/simpleCard/SimpleCard";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux/useTypedRedux";
import {useEffect} from "react";
import {getEntity} from "../../../../store/slices/verticalEntitySlice";
import classes from "./FirstPeriodHorizontal.module.scss";
import {TextField} from "@mui/material";


const FirstPeriodHorizontal = () => {
  const {entity, loading} = useAppSelector(state => state.horizontalEntity);
  const period = 1;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getEntity(period))
  }, [])
  return (
    <div>
        <form >
          <div className={classes.container}>
            <SimpleCard>
              <h3>Основная информация</h3>
              <div className={classes.container__inputList}>
                <div className={classes.container__inputList__preview}>
                  <SimpleCard width="full" variant='outlined' height='full'>
                    <img className={classes.container__inputList__preview__img} src={entity.about.title.img} alt="первью периода" />
                  </SimpleCard>
                </div>
                <div className={classes.container__inputList__inputs}>
                  <TextField value={entity.name} label='название' variant='outlined'/>
                  <TextField value={entity.about.title.name} label='заголовок' variant='outlined'/>
                  <TextField value={entity.about.title.number} label='номер' variant='outlined'/>
                  <TextField multiline value={entity.about.text} label='текст' variant='outlined'/>
                </div>
              </div>
            </SimpleCard>
            <SimpleCard height='full'>
              <h3>Галерея</h3>
            </SimpleCard>
          </div>
          <div className={classes.container__buttons}>
            <button onClick={() => {}} className={classes.container__buttons__cancelButton}>Отмена</button>
            <button onClick={() => {}} className={classes.container__buttons__submitButton}>Сохранить измененияя</button>
          </div>
        </form>
      {loading && <div>Loading...(временная заглушка)</div>}
    </div>
  );
};

export default FirstPeriodHorizontal;
