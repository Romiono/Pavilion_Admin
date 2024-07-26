import classes from './PeriodVertical.module.scss'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux/useTypedRedux'
import {
  getEntity,
  setHeaderDescription,
  setHeaderTitle,
  setSecondLevelHeaderDescription,
  setSecondLevelHeaderTitle,
  setSecondLevelSourcesAboutMainTitle,
  setSecondLevelSourcesAboutNumber,
  setSecondLevelSourcesAboutText,
  setSecondLevelText,
  setText
} from '../../../store/slices/verticalEntitySlice'
import SimpleCard from '../../../components/ui/simpleCard/SimpleCard'
import MultipleImageForm from '../../../components/multipleImageForm/MultipleImageForm'
import { TextField } from '@mui/material'
import JoditEditor from 'jodit-react'
import SingleImageForm from '../../../components/singleImageForm/SingleImageForm'

interface PeriodVertical {
  period: number
}

const PeriodVertical = ({ period }: PeriodVertical) => {
  const { entity, loading } = useAppSelector((state) => state.verticalEntity)
  const [images, setImages] = useState([])
  const [mainImage, setMainImage] = useState({ file: '', url: '' })
  const dispatch = useAppDispatch()
  const editor1 = useRef(null)
  const editor2 = useRef(null)
  const editor3 = useRef(null)
  useEffect(() => {
    dispatch(getEntity(period))
  }, [])

  const joditConfig = useMemo(
    () => ({
      readOnly: false
    }),
    []
  )
  return (
    <form>
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
                //@ts-ignore
                config={joditConfig}
                value={entity.text}
                onChange={(value) => dispatch(setText(value))}
                ref={editor1}
              />
              {/*<TextField multiline value={entity.about.text} onChange={(e) => dispatch(setAboutText(e.target.value))}  label='текст' variant='outlined'/>*/}
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
                //@ts-ignore
                config={joditConfig}
                value={entity.secondLevel.text}
                onChange={(value) => dispatch(setSecondLevelText(value))}
                ref={editor2}
              />
              {/*<TextField multiline value={entity.about.text} onChange={(e) => dispatch(setAboutText(e.target.value))}  label='текст' variant='outlined'/>*/}
            </div>
          </div>
        </SimpleCard>
        <SimpleCard>
          <h3>О нас</h3>
          <div className={classes.container__inputList}>
            <div className={classes.container__inputList__inputs}>
              <div className={classes.container__inputList__preview}>
                <SingleImageForm image={mainImage} setImage={setMainImage} />
              </div>
              <TextField
                value={entity.secondLevel.sources.about.number}
                onChange={(e) => dispatch(setSecondLevelSourcesAboutNumber(e.target.value))}
                label="Номер"
                variant="outlined"
                inputMode="tel"
              />
              <TextField
                value={entity.secondLevel.sources.about.main.title}
                onChange={(e) => dispatch(setSecondLevelSourcesAboutMainTitle(e.target.value))}
                label="Заголовок"
                variant="outlined"
              />
              <JoditEditor
                //@ts-ignore
                config={joditConfig}
                value={entity.secondLevel.sources.about.text}
                onChange={(value) => dispatch(setSecondLevelSourcesAboutText(value))}
                ref={editor3}
              />
              {/*<TextField multiline value={entity.about.text} onChange={(e) => dispatch(setAboutText(e.target.value))}  label='текст' variant='outlined'/>*/}
            </div>
          </div>
        </SimpleCard>
        <SimpleCard>
          <h3>Галерея</h3>
          <div className={classes.container__inputList}>
            <MultipleImageForm images={images} setImages={setImages} />
          </div>
        </SimpleCard>
      </div>
      <div className={classes.container__buttons}>
        <button
          onClick={() => dispatch(getEntity)}
          className={classes.container__buttons__cancelButton}
        >
          Отмена
        </button>
        <button onClick={() => {}} className={classes.container__buttons__submitButton}>
          Сохранить измененияя
        </button>
      </div>
      {loading && <div>Loading...(временная заглушка)</div>}
    </form>
  )
}

export default PeriodVertical
