import SimpleCard from "../ui/simpleCard/SimpleCard";
import clsx from "clsx";
import {useEffect, useRef, useState} from "react";
import classes from './SingleImageForm.module.scss'
import {useAppSelector} from "../../hooks/redux/useTypedRedux";

interface SingleImageForm {
  image: {
    file: string | object,
    url: string
  },
  setImage: (image) => void
}


const SingleImageForm = ({image, setImage}: SingleImageForm) => {
  const [isDragging, setIsDragging] = useState(false);
  const serverImage = useAppSelector(state => state.horizontalEntity.entity.about.title.img)
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (serverImage) {
      setImage(
        {
          file: new URL(serverImage).origin,
          url: serverImage
        }
      )
    }
  }, [])

  const onDragOverUploader = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const onDragLeaveUploader = (e) => {
    e.preventDefault()
    setIsDragging(false);
  }

  const onDropUploader = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = [...e.dataTransfer.files]
    console.log(file)
    setImage(
      {
        file: file[0],
        url: URL.createObjectURL(file[0]),
      }
    )
  }

  const Browse = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  const onFileSelect = (e) => {
    const file = e.target.files[0]
    console.log(file);
    setImage(
      {
        file,
        url: URL.createObjectURL(file),
      }
    )
  }

  return (
    <div className={classes.container__dragArea} onDragOver={onDragOverUploader} onDragLeave={onDragLeaveUploader}
         onDrop={onDropUploader}>
      <img src={image.url} alt={image.file.toString()} className={classes.container__dragArea__bgImage}/>
      <SimpleCard variant='outlined' height='full'  className={clsx({
        [classes.active]: isDragging,
        [classes.disabled]: !isDragging
      })}>
          {
            isDragging ?
              <p className={classes.container__dragArea__text}>Drop images</p>
              :
              <p className={classes.container__dragArea__text}>Drag & drop images here or <span onClick={Browse}
                                                                                                className={classes.container__dragArea__text__span}>
                  Browse
                </span>
              </p>
          }
        <input type='file' accept='image/*,.png,.jpg,.jpeg,.web' onChange={onFileSelect}
               className={classes.hidden} ref={inputRef}/>
      </SimpleCard>
    </div>
  )
}
export default SingleImageForm;
