export default interface VerticalEntity {
  id: string | null,
  interval: {
    start: number | null,
    end: number | null,
  }
  header: header | null,
  map: map | null,
  text: string | null,
  secondLevel: {
    header: header | null,
    background: string | null,
    thirdLevelBackground: string | null,
    map: map | null,
    sources: sourse | null,
    text: string | null
  }

}

interface header {
  title: string,
  description: string
}

interface map {
  background: string
}

interface sourse {
  id: string,
  img: string,
  x: number,
  y: number,
  about: about
}

interface about {
  number: number
  main: {
    img: string
    title: string
  }
  text: string
  images: string[]
}
