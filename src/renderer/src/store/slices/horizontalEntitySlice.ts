import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import openNotification from '../../helpers/notification'

export interface IHorizontalEntity {
  id: string
  name: string
  about: {
    title: {
      img: string
      name: string
      number: string
    }
    text: string
    images: string[]
  }
}

interface initialState {
  entity: IHorizontalEntity
  loading: boolean
  error: string
  status: string
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
  error: '',
  status: ''
}

export const getEntity = createAsyncThunk<any>(
  'horizontalEntity/get',
  // @ts-ignore
  async (_, { rejectWithValue }) => {
    try {
      const data = await axios.get(`${import.meta.env.VITE_BASE_URL_API}/api/horisontal/33`)
      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      }
    }
  }
)

export const postEntity = createAsyncThunk<any, any>(
  'horizontalEntity/post',
  // @ts-ignore
  async (data, { rejectWithValue, dispatch }) => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL_API}/api/horisontal`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      dispatch(getEntity())
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
      state.entity = action.payload.data.data.value
      state.loading = false
      state.error = ''
      state.status = 'succes'
    })
    builder.addCase(getEntity.pending, (state) => {
      state.error = ''
      state.loading = true
      state.status = 'pending'
    })
    builder.addCase(getEntity.rejected, (state, action) => {
      state.loading = false
      state.error = `${action.payload}`
      openNotification({
        type: 'error',
        text: action.payload ? `${action.payload}` : 'Не удалось получить данные'
      })
      state.status = ''
    })
    builder.addCase(postEntity.fulfilled, (state) => {
      state.loading = false
      state.error = ''
      openNotification({
        type: 'success',
        text: 'Данные горизонтальной модели успешно обновлены'
      })
    })
    builder.addCase(postEntity.pending, (state) => {
      state.error = ''
      state.loading = true
    })
    builder.addCase(postEntity.rejected, (state, action) => {
      state.loading = false
      state.error = `${action.payload}`
      openNotification({
        type: 'error',
        text: action.payload ? `${action.payload}` : 'Не удалось обнавить данные'
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
