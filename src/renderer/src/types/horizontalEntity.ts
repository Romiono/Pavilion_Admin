export default interface horizontalEntity {
  id: string | null,
  img: FormData | null,
  x: number | null,
  y: number | null,
  name: string | null,
  about: {
    title: {
      img: FormData | null,
      name: string | null,
      number: number | null,
    },
    text: any,
    images: FormData[] | null,
    background: FormData | null
  }
}

