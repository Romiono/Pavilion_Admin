import classes from "./ImageForm.module.scss";
import SimpleCard from "../ui/simpleCard/SimpleCard";
import {useEffect, useRef, useState} from "react";
import {useAppSelector} from "../../hooks/redux/useTypedRedux";
import clsx from "clsx";

interface IImages {
  name: string,
  url: string
}

const ImageForm = () => {
  const serverImages = useAppSelector(state => state.horizontalEntity.entity.about.images);
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState<IImages[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return setImages(serverImages.map((item, index) => {
      return {
        name: index.toString(),
        url: item
      };
    }));
  }, [])

  const Browse = () => {
    if(inputRef.current) {
      inputRef.current.click();
    }
  }

  const onFileSelect = (e) => {
    const files = e.target.files;
    console.log(files);
    if(files.length === 0) return;
    for(let i = 0; i < files.length; i++) {
      if(!images.some((e) => e?.name === files[i].name)) {
        console.log(URL.createObjectURL(files[i]))
        setImages((prev) => [
          ...prev,
          {
            ...files[i],
            url: URL.createObjectURL(files[i]),
          }
        ])
      }
    }
  }

  const deleteImage = (url) => {
    setImages((prev) => prev.filter((item) => item.url !== url));
  }

  const onDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
    e.dataTransfer.dropEffect = "copy";
  }

  const onDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false);
  }

  const onDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    for(let i = 0; i < files.length; i++) {
      if(!images.some((e) => e?.name === files[i].name)) {
        console.log(URL.createObjectURL(files[i]))
        setImages((prev) => [
          ...prev,
          {
            ...files[i],
            url: URL.createObjectURL(files[i]),
          }
        ])
      }
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.container__dragArea} >
        <SimpleCard variant='outlined' height='full' onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop} className={clsx({
          [classes.active]: isDragging
        })}>
            {
              isDragging ?
                <p className={classes.container__dragArea__text}>Drop images</p>
                :
                <p className={classes.container__dragArea__text}>Drag & drop images here or <span onClick={Browse} className={classes.container__dragArea__text__span}>
                  Browse
                </span>
                </p>
            }
          <input type='file' accept='image/*,.png,.jpg,.jpeg,.web' multiple onChange={onFileSelect} className={classes.hidden} ref={inputRef}/>
        </SimpleCard>
      </div>
      <div className={classes.container__images}>
        {
          images?.map((image) =>
            <div key={image.name} className={classes.container__images__image}>
              <span onClick={() => deleteImage(image.url)}>&times;</span>
              <img src={image.url} alt={image.name} className={classes.container__images__image__img} />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default ImageForm;
