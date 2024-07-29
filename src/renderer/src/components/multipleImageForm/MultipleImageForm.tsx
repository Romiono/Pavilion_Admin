import classes from './MultipleImageForm.module.scss'
import SimpleCard from '../ui/simpleCard/SimpleCard'
import { useRef, useState } from 'react'
import clsx from 'clsx'

export interface IImages {
  name: string
  url: string
  file?: File
}

interface MultipleImageForm {
  images: IImages[]
  setImages: (i) => void
}

const MultipleImageForm = ({ images, setImages }: MultipleImageForm) => {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [currentDragImage, setCurrentDragImage] = useState(null)

  const Browse = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const onFileSelect = (e) => {
    const files = e.target.files
    console.log(files)
    if (files.length === 0) return
    for (let i = 0; i < files.length; i++) {
      if (!images.some((e) => e?.name === files[i].name)) {
        console.log(URL.createObjectURL(files[i]))
        setImages((prev) => [
          ...prev,
          {
            name: files[i].name,
            file: files[i],
            url: URL.createObjectURL(files[i])
          }
        ])
      }
    }
  }

  const deleteImage = (url) => {
    setImages((prev) => prev.filter((item) => item.url !== url))
  }

  const onDragOverUploader = (e) => {
    e.preventDefault()
    setIsDragging(true)
    e.dataTransfer.dropEffect = 'copy'
  }

  const onDragLeaveUploader = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const onDropUploader = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    for (let i = 0; i < files.length; i++) {
      if (!images.some((e) => e?.name === files[i].name)) {
        console.log(URL.createObjectURL(files[i]))
        setImages((prev) => [
          ...prev,
          {
            name: files[i].name,
            file: files[i],
            url: URL.createObjectURL(files[i])
          }
        ])
      }
    }
  }

  const onDragStartImages = (item) => {
    setCurrentDragImage(item)
  }

  const onDropImages = (e, item) => {
    e.preventDefault()
    if (currentDragImage) {
      const currentIndex = images.indexOf(currentDragImage)
      const dropIndex = images.indexOf(item)
      const arr = images
      arr.splice(currentIndex, 1)
      arr.splice(dropIndex + 1, 0, currentDragImage)
      setImages([...arr])
      console.log('sus')
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.container__dragArea}>
        <SimpleCard
          variant="outlined"
          height="full"
          onDragOver={onDragOverUploader}
          onDragLeave={onDragLeaveUploader}
          onDrop={onDropUploader}
          className={clsx({
            [classes.active]: isDragging
          })}
        >
          {isDragging ? (
            <p className={classes.container__dragArea__text}>Drop images</p>
          ) : (
            <p className={classes.container__dragArea__text}>
              Drag & drop images here or{' '}
              <span onClick={Browse} className={classes.container__dragArea__text__span}>
                Browse
              </span>
            </p>
          )}
          <input
            type="file"
            accept="image/*,.png,.jpg,.jpeg,.web"
            multiple
            onChange={onFileSelect}
            className={classes.hidden}
            ref={inputRef}
          />
        </SimpleCard>
      </div>
      <div className={classes.container__images}>
        {images?.map((image) => (
          <div
            key={image.name}
            className={classes.container__images__image}
            draggable={true}
            onDragStart={() => onDragStartImages(image)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDropImages(e, image)}
          >
            <span onClick={() => deleteImage(image.url)}>&times;</span>
            <img
              src={image.url}
              alt={image.name}
              className={classes.container__images__image__img}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MultipleImageForm
