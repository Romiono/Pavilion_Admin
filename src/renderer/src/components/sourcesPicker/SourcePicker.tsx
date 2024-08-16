import classes from './SourcesPicker.module.scss'
import SimpleCard from '../ui/simpleCard/SimpleCard'
import SingleImageForm from '../singleImageForm/SingleImageForm'
import { TextField } from '@mui/material'
import {
  getEntityById,
  setSecondLevelSourcesAboutMainTitle,
  setSecondLevelSourcesAboutNumber,
  setSecondLevelSourcesAboutText
} from '../../store/slices/verticalEntitySlice'
import JoditEditor from 'jodit-react'
import MultipleImageForm, { IMultiplePeackerImages } from '../multipleImageForm/MultipleImageForm'
import { useAppDispatch, useAppSelector } from '../../hooks/redux/useTypedRedux'
import { useEffect, useMemo, useRef, useState } from 'react'
import { postEntity } from '../../store/slices/horizontalEntitySlice'
import clsx from 'clsx'
import IImages from '../../types/IImages'
import { useParams } from 'react-router-dom'

interface SourceItem {
  index: number
}

const SourcePicker = ({ index }: SourceItem) => {
  const { id, period } = useParams()
  const { entity, status } = useAppSelector((state) => state.verticalEntity)
  const dispatch = useAppDispatch()

  const [images, setImages] = useState<IImages[]>([])
  const [mainImage, setMainImage] = useState<IMultiplePeackerImages>({ name: '', link: '' })

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
            name: item.name,
            link: item.link,
            id: item.id,
            priority: item.id
          }
        })
      ])
      setMainImage({
        name: entity.secondLevel.sources[index].about.main.img,
        link: entity.secondLevel.sources[index].about.main.img
      })
      console.log('успешно')
    } else {
      setImages([])
      setMainImage({ name: '', link: '' })
    }
  }, [status])

  const setSource = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('Id', entity.secondLevel.sources[index].id.toString())
    data.append('Source.Index', index.toString())
    mainImage.file
      ? data.append('About.Main.Img.FromDataFile', mainImage.file)
      : data.append('About.Main.Img.link', mainImage.link || 'nothing')

    data.append('About.Main.Title', entity.secondLevel.sources[index].about.main.title || '')
    data.append('About.Number', entity.secondLevel.sources[index].about.number || '')
    data.append('About.Text', entity.secondLevel.sources[index].about.text || '')
    images &&
      images.forEach((item, index) => {
        data.append(`About.Images[${index}].priority`, `${index}`)
        item.file
          ? data.append(`About.Images[${index}].FromDataFile`, item.file)
          : data.append(`About.Images[${index}].Link`, item.link)
        item.id && data.append(`About.Images[${index}].Id`, item.id.toString())
      })
    dispatch(postEntity({ entity: data, index: id })).then(() => {
      dispatch(getEntityById({ period, id }))
    })
  }

  return (
    <form className={classes.form}>
      <div className={classes.container}>
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
                onChange={(value) =>
                  dispatch(setSecondLevelSourcesAboutText({ index, data: value }))
                }
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
      </div>
      <div>
        <div className={classes.container__buttons}>
          <button
            onClick={(e) => setSource(e)}
            className={clsx(classes.container__buttons__button, classes.submitButton)}
          >
            Сохранить измененияя
          </button>
        </div>
      </div>
    </form>
  )
}

export default SourcePicker
