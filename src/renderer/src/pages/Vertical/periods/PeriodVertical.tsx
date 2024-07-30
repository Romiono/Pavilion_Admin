import classes from './PeriodVertical.module.scss'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux/useTypedRedux'
import {
  getEntity,
  postEntity,
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
import MultipleImageForm, { IImages } from '../../../components/multipleImageForm/MultipleImageForm'
import { TextField } from '@mui/material'
import JoditEditor from 'jodit-react'
import SingleImageForm from '../../../components/singleImageForm/SingleImageForm'
import Spiner from '../../../components/ui/loader/Spiner'
import { useParams } from 'react-router-dom'

const PeriodVertical = () => {
  const { period } = useParams()
  const { entity, loading } = useAppSelector((state) => state.verticalEntity)
  const [images, setImages] = useState<IImages[]>([])
  const [mainImage, setMainImage] = useState<IImages>({ name: '', url: '' })
  const dispatch = useAppDispatch()
  const editor1 = useRef(null)
  const editor2 = useRef(null)
  const editor3 = useRef(null)
  useEffect(() => {
    dispatch(getEntity(period)).then((res) => {
      if (getEntity.fulfilled.match(res)) {
        setImages(
          entity.secondLevel.sources.about.images.map((item) => {
            return {
              name: new URL(item).origin,
              url: item
            }
          })
        )
        setMainImage({
          name: new URL(entity.secondLevel.sources.about.main.img).origin,
          url: entity.secondLevel.sources.about.main.img
        })
        console.log('успешно')
      } else {
        console.log('ошибка')
      }
    })
  }, [period])

  const joditConfig = useMemo(
    () => ({
      readonly: false
    }),
    []
  )

  const setEntity = (e) => {
    e.preventDefault
    const data = new FormData()
    data.append('Text', entity.text)
    data.append('Header.Title', entity.header.title)
    data.append('Header.Description', entity.header.description)

    data.append('SecondLevel.Header.Title', entity.secondLevel.header.title)
    data.append('SecondLevel.Header.Description', entity.secondLevel.header.description)
    data.append('SecondLevel.Text', entity.secondLevel.text)

    data.append('SecondLevel.Sources.About.Number', entity.secondLevel.sources.about.number)
    data.append('SecondLevel.Sources.About.Text', entity.secondLevel.sources.about.text)
    data.append('SecondLevel.Sources.About.Main.Title', entity.secondLevel.sources.about.main.title)

    mainImage.file
      ? data.append('SecondLevel.Sources.About.Main.Img.file', mainImage.file)
      : data.append('SecondLevel.Sources.About.Main.Img.link', mainImage.url)

    images &&
      images.forEach((item, index) => {
        data.append(`SecondLevel.Sources.About.Images[${index}].priority`, `${index}`)
        item.file
          ? data.append(`SecondLevel.Sources.About.Images[${index}].file`, item.file)
          : data.append(`SecondLevel.Sources.About.Images[${index}].link`, item.url)
      })
    dispatch(postEntity({ entity: data, period }))
  }
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
                config={joditConfig}
                value={entity.secondLevel.sources.about.text}
                onChange={(value) => dispatch(setSecondLevelSourcesAboutText(value))}
                ref={editor3}
              />
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
          onClick={() => dispatch(getEntity(period))}
          className={classes.container__buttons__cancelButton}
        >
          Отмена
        </button>
        <button onClick={(e) => setEntity(e)} className={classes.container__buttons__submitButton}>
          Сохранить измененияя
        </button>
      </div>
      {loading && <Spiner />}
    </form>
  )
}

export default PeriodVertical
