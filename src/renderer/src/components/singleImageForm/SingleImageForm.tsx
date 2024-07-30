import SimpleCard from '../ui/simpleCard/SimpleCard'
import clsx from 'clsx'
import { useRef, useState } from 'react'
import classes from './SingleImageForm.module.scss'

interface SingleImageForm {
  image: {
    name: string
    url: string
    file?: File
  }
  setImage: (image) => void
}

const SingleImageForm = ({ image, setImage }: SingleImageForm) => {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const onDragOverUploader = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const onDragLeaveUploader = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const onDropUploader = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = [...e.dataTransfer.files]
    setImage({
      name: file[0].name,
      file: file[0],
      url: URL.createObjectURL(file[0])
    })
  }

  const Browse = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const onFileSelect = (e) => {
    const file = e.target.files[0]
    setImage({
      name: file.name,
      file: file,
      url: URL.createObjectURL(file)
    })
  }

  return (
    <div
      className={classes.container__dragArea}
      onDragOver={onDragOverUploader}
      onDragLeave={onDragLeaveUploader}
      onDrop={onDropUploader}
    >
      <img src={image.url} alt={image.name} className={classes.container__dragArea__bgImage} />
      <SimpleCard
        variant="outlined"
        height="full"
        className={clsx({
          [classes.active]: isDragging,
          [classes.disabled]: !isDragging
        })}
      >
        {isDragging ? (
          <p className={classes.container__dragArea__text}>Drop image</p>
        ) : (
          <p className={classes.container__dragArea__text}>
            Drag & drop image here or{' '}
            <span onClick={Browse} className={classes.container__dragArea__text__span}>
              Browse
            </span>
          </p>
        )}
        <input
          type="file"
          accept="image/*,.png,.jpg,.jpeg,.web"
          onChange={onFileSelect}
          className={classes.hidden}
          ref={inputRef}
        />
      </SimpleCard>
    </div>
  )
}
export default SingleImageForm
