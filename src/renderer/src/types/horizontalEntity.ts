export default interface horizontalEntity {
  id: string | null,
  img: string | null,
  x: number | null,
  y: number | null,
  name: string | null,
  about: about
}

interface about {
  title: title,
  text: any,
  images: string[] | null,
  background: string | null,
}

interface title {
  img: string | null,
  name: string | null,
  number: number | null
}
