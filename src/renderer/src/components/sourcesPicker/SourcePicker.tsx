import classes from './SourcesPicker.module.scss'
import SimpleCard from '../ui/simpleCard/SimpleCard'
import SingleImageForm from '../singleImageForm/SingleImageForm'
import { TextField } from '@mui/material'
import {
  setSecondLevelSourcesAboutMainTitle,
  setSecondLevelSourcesAboutNumber,
  setSecondLevelSourcesAboutText
} from '../../store/slices/verticalEntitySlice'
import JoditEditor from 'jodit-react'
import MultipleImageForm, { IImages } from '../multipleImageForm/MultipleImageForm'
import { useAppDispatch, useAppSelector } from '../../hooks/redux/useTypedRedux'
import { useEffect, useMemo, useRef, useState } from 'react'

interface SourceItem {
  index: number
}

const SourcePicker = ({ index }: SourceItem) => {
  const { entity, status } = useAppSelector((state) => state.verticalEntity)
  const dispatch = useAppDispatch()

  const [images, setImages] = useState<IImages[]>([])
  const [mainImage, setMainImage] = useState<IImages>({ name: '', url: '' })

  const joditConfig = useMemo(
    () => ({
      readonly: false
    }),
    []
  )

  const editor = useRef(null)

  useEffect(() => {
    if (status === 'succes') {
      console.log(index)
      setImages([
        ...entity.secondLevel.sources[index].about.images.map((item) => {
          return {
            // name: new URL(item).origin,
            name: item,
            url: item
          }
        })
      ])
      setMainImage({
        // name: new URL(entity.secondLevel.sources[index].about.main.img).origin,
        name: entity.secondLevel.sources[index].about.main.img,
        url: entity.secondLevel.sources[index].about.main.img
      })
      console.log('успешно')
    } else {
      setImages([])
      setMainImage({ name: '', url: '' })
    }
  }, [status])

  return (
    <>
      <SimpleCard>
        <h3>О нас {index + 1}</h3>
        <div className={classes.container__inputList}>
          <div className={classes.container__inputList__inputs}>
            <div className={classes.container__inputList__preview}>
              <SingleImageForm image={mainImage} setImage={setMainImage} />
            </div>
            <TextField
              value={entity.secondLevel.sources[index].about.number}
              onChange={(e) =>
                dispatch(setSecondLevelSourcesAboutNumber({ index, data: e.target.value }))
              }
              label="Номер"
              variant="outlined"
              inputMode="tel"
            />
            <TextField
              value={entity.secondLevel.sources[index].about.main.title}
              onChange={(e) =>
                dispatch(setSecondLevelSourcesAboutMainTitle({ index, data: e.target.value }))
              }
              label="Заголовок"
              variant="outlined"
            />
            <JoditEditor
              config={joditConfig}
              value={entity.secondLevel.sources[index].about.text}
              onChange={(value) => dispatch(setSecondLevelSourcesAboutText({ index, data: value }))}
              ref={editor}
            />
          </div>
        </div>
      </SimpleCard>
      <SimpleCard>
        <h3>Галерея {index + 1}</h3>
        <div className={classes.container__inputList}>
          <MultipleImageForm images={images} setImages={setImages} />
        </div>
      </SimpleCard>
    </>
  )
}

export default SourcePicker
