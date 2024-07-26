import SimpleCard from '../../../components/ui/simpleCard/SimpleCard'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux/useTypedRedux'
import { useEffect, useMemo, useRef, useState } from 'react'
import classes from './PeriodHorizontal.module.scss'
import { TextField } from '@mui/material'
import MultipleImageForm, { IImages } from '../../../components/multipleImageForm/MultipleImageForm'
import JoditEditor from 'jodit-react'
import {
  setAboutText,
  setAboutTitleName,
  setAboutTitleNumber,
  setName,
  getEntity
} from '../../../store/slices/horizontalEntitySlice'
import SingleImageForm from '../../../components/singleImageForm/SingleImageForm'
import Spiner from '../../../components/ui/loader/Spiner'

const PeriodHorizontal = () => {
  const { entity, loading } = useAppSelector((state) => state.horizontalEntity)
  const [images, setImages] = useState<IImages[]>([])
  const [titleImage, setTitleImage] = useState({ file: '', url: '' })
  const editor = useRef(null)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getEntity()).then(() => {
      setImages(
        entity.about.images.map((item, index) => {
          return {
            name: index.toString(),
            url: item
          }
        })
      )
      if (entity.about.title.img) {
        setTitleImage({
          file: new URL(entity.about.title.img).origin,
          url: entity.about.title.img
        })
      }
      console.log('успешно')
    })
  }, [])

  const joditConfig = useMemo(
    () => ({
      placeholder: 'Текст для вкладки about',
      readonly: false
    }),
    []
  )

  return (
    <div>
      <form>
        <div className={classes.container}>
          <SimpleCard>
            <h3>Основная информация</h3>
            <div className={classes.container__inputList}>
              <div className={classes.container__inputList__preview}>
                <SingleImageForm image={titleImage} setImage={setTitleImage} />
              </div>
              <div className={classes.container__inputList__inputs}>
                <TextField
                  value={entity.name}
                  onChange={(e) => dispatch(setName(e.target.value))}
                  label="название"
                  variant="outlined"
                />
                <TextField
                  value={entity.about.title.name}
                  onChange={(e) => dispatch(setAboutTitleName(e.target.value))}
                  label="заголовок"
                  variant="outlined"
                />
                <TextField
                  value={entity.about.title.number}
                  onChange={(e) => dispatch(setAboutTitleNumber(e.target.value))}
                  label="номер"
                  variant="outlined"
                />
                <JoditEditor
                  config={joditConfig}
                  value={entity.about.text}
                  onChange={(value) => dispatch(setAboutText(value))}
                  ref={editor}
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
            onClick={() => dispatch(getEntity)}
            className={classes.container__buttons__cancelButton}
          >
            Отмена
          </button>
          <button onClick={() => {}} className={classes.container__buttons__submitButton}>
            Сохранить измененияя
          </button>
        </div>
      </form>
      {loading && <Spiner />}
    </div>
  )
}

export default PeriodHorizontal
