import classes from './PeriodVertical.module.scss'
import { useEffect, useMemo, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux/useTypedRedux'
import {
  getEntityById,
  postEntity,
  setHeaderDescription,
  setHeaderTitle,
  setSecondLevelHeaderDescription,
  setSecondLevelHeaderTitle,
  setSecondLevelText,
  setText
} from '../../../store/slices/verticalEntitySlice'
import SimpleCard from '../../../components/ui/simpleCard/SimpleCard'
// import MultipleImageForm, { IImages } from '../../../components/multipleImageForm/MultipleImageForm'
import { TextField } from '@mui/material'
import JoditEditor from 'jodit-react'
// import SingleImageForm from '../../../components/singleImageForm/SingleImageForm'
import Spiner from '../../../components/ui/loader/Spiner'
import { useParams } from 'react-router-dom'
import clsx from 'clsx'
import SourcePicker from '@renderer/components/sourcesPicker/SourcePicker'

const PeriodVertical = () => {
  const { period, id } = useParams()
  const { entity, loading } = useAppSelector((state) => state.verticalEntity)
  const dispatch = useAppDispatch()
  const editor1 = useRef(null)
  const editor2 = useRef(null)
  useEffect(() => {
    dispatch(getEntityById({ period, id }))
  }, [period])

  const joditConfig = useMemo(
    () => ({
      readonly: false
    }),
    []
  )

  useEffect(() => {
    console.log(period)
  }, [])

  const setEntity = (e) => {
    e.preventDefault
    const data = new FormData()
    data.append('Id', period as string)
    data.append('Text', entity.text)
    data.append('Header.Title', entity.header.title)
    data.append('Header.Description', entity.header.description)

    data.append('SecondLevel.Header.Title', entity.secondLevel.header.title)
    data.append('SecondLevel.Header.Description', entity.secondLevel.header.description)
    data.append('SecondLevel.Text', entity.secondLevel.text)

    dispatch(postEntity({ entity: data, period, id }))
  }
  return (
    <form>
      <SimpleCard variant={'outlined'} className={classes.source}>
        <div className={classes.container}>
          <SimpleCard>
            <h3>Основная информация</h3>
            <div className={classes.container__inputList}>
              <div className={classes.container__inputList__inputs}>
                <TextField
                  value={entity.header.title}
                  onChange={(e) => dispatch(setHeaderTitle(e.target.value))}
                  label="Заголовок"
                  variant="outlined"
                />
                <TextField
                  value={entity.header.description}
                  onChange={(e) => dispatch(setHeaderDescription(e.target.value))}
                  label="Описание"
                  variant="outlined"
                />
                <JoditEditor
                  config={joditConfig}
                  value={entity.text}
                  onChange={(value) => dispatch(setText(value))}
                  ref={editor1}
                />
              </div>
            </div>
          </SimpleCard>
          <SimpleCard>
            <h3>Информация второго уровня</h3>
            <div className={classes.container__inputList}>
              <div className={classes.container__inputList__inputs}>
                <TextField
                  value={entity.secondLevel.header.title}
                  onChange={(e) => dispatch(setSecondLevelHeaderTitle(e.target.value))}
                  label="Заголовок"
                  variant="outlined"
                />
                <TextField
                  value={entity.secondLevel.header.description}
                  onChange={(e) => dispatch(setSecondLevelHeaderDescription(e.target.value))}
                  label="Описание"
                  variant="outlined"
                />
                <JoditEditor
                  config={joditConfig}
                  value={entity.secondLevel.text}
                  onChange={(value) => dispatch(setSecondLevelText(value))}
                  ref={editor2}
                />
              </div>
            </div>
          </SimpleCard>
        </div>
        <div className={classes.container__buttons}>
          <button
            onClick={(e) => setEntity(e)}
            className={clsx(classes.container__buttons__button, classes.submitButton)}
          >
            Сохранить измененияя
          </button>
        </div>
      </SimpleCard>
      <SimpleCard className={classes.source} variant={'outlined'}>
        {entity.secondLevel.sources.map((_, index) => (
          <SourcePicker index={index} key={index} />
        ))}
      </SimpleCard>
      <div className={classes.container__buttons}>
        <button
          onClick={() => dispatch(getEntityById(period))}
          className={clsx(classes.container__buttons__button, classes.cancelButton)}
        >
          Отмена
        </button>
        <button
          onClick={() => dispatch(getEntityById(period))}
          className={clsx(classes.container__buttons__button, classes.updateButton)}
        >
          Обновить данные
        </button>
      </div>
      {loading && <Spiner />}
    </form>
  )
}

export default PeriodVertical
