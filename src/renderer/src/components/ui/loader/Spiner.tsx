import classes from './Spiner.module.scss'

const Spiner = () => {
  return (
    <div className={classes.container}>
      <span className={classes.container__loader} />
    </div>
  )
}

export default Spiner
