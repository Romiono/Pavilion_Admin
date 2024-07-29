import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import openNotification from '../../helpers/notification'

export interface IHorizontalEntity {
  id: string
  // img: string, //константа
  // x: number, //константа
  // y: number, //константа
  name: string
  about: {
    title: {
      img: string
      name: string
      number: string
    }
    text: string
    images: string[]
    // background: string, //константа
  }
}

interface initialState {
  entity: IHorizontalEntity
  loading: boolean
  error: string | null
}

const initialState: initialState = {
  entity: {
    id: '', //константа
    // img: '', //константа
    // x: 0, //константа
    // y: 0, //константа
    name: '',
    about: {
      title: {
        img: '',
        name: '',
        number: ''
      },
      text: '',
      images: []
      // background: '', //константа
    }
  },
  loading: false,
  error: null
}

export const getEntity = createAsyncThunk<any>(
  'horizontalEntity',
  // @ts-ignore
  async (_, { rejectWithValue }) => {
    try {
      const data = await axios.get(`${import.meta.env.VITE_BASE_URL_API}/horizontal`)
      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      }
    }
  }
)

export const horizontalEntitySlice = createSlice({
  name: 'horizontalEntity',
  initialState,
  reducers: {
    setEntity: (state, action) => {
      const data: IHorizontalEntity = action.payload
      state.entity.name = data.name
      state.entity.about.title = data.about.title
      state.entity.about.text = data.about.text
      if (data.about.images instanceof Array) {
        state.entity.about.images = [...data.about.images]
      } else {
        state.entity.about.images = data.about.images
      }
    },
    setName: (state, action) => {
      state.entity.name = action.payload
    },
    setAboutTitleName: (state, action) => {
      state.entity.about.title.name = action.payload
    },
    setAboutTitleNumber: (state, action) => {
      state.entity.about.title.number = action.payload
    },
    setAboutTitleImage: (state, action) => {
      state.entity.about.title.img = action.payload
    },
    setAboutText: (state, action) => {
      state.entity.about.text = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getEntity.fulfilled, (state, action) => {
      state.entity = action.payload
      state.loading = false
      state.error = null
    })
    builder.addCase(getEntity.pending, (state) => {
      state.error = null
      state.loading = true
    })
    builder.addCase(getEntity.rejected, (state, action) => {
      state.loading = false
      state.error = `${action.payload}`
      openNotification({
        type: 'error',
        text: `Ошибка`
      })
    })
  }
})

export const {
  setEntity,
  setName,
  setAboutTitleName,
  setAboutText,
  setAboutTitleImage,
  setAboutTitleNumber
} = horizontalEntitySlice.actions

export default horizontalEntitySlice.reducer
