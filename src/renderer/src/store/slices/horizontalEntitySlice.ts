import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import openNotification from '../../helpers/notification'
import IAllEnttities from '../../types/IAllEntities'
import IImages from '../../types/IImages'

export interface IHorizontalEntity {
  id: string | number
  name: string
  about: {
    title: {
      img: string
      name: string
      number: string
    }
    text: string
    images: IImages[]
  }
}

interface initialState {
  entity: IHorizontalEntity
  allEntities: IAllEnttities[]
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
  allEntities: [],
  loading: false,
  error: '',
  status: ''
}
export const getAllHorizontalEntities = createAsyncThunk<any>(
  'horizontalEntities/getAllEntities',
  // @ts-ignore
  async (_, { rejectWithValue }) => {
    try {
      const data = await axios.get(`${import.meta.env.VITE_BASE_URL_API}/api/horisontal`)
      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      }
    }
  }
)

export const getEntityById = createAsyncThunk<any, any>(
  'horizontalEntity/get',
  // @ts-ignore
  async (index, { rejectWithValue }) => {
    try {
      const data = await axios.get(`${import.meta.env.VITE_BASE_URL_API}/api/horisontal/${index}`)
      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error)
      }
    }
  }
)

export const postEntity = createAsyncThunk<any, any>(
  'horizontalEntity/post',
  // @ts-ignore
  async (data, { rejectWithValue, dispatch }) => {
    const { entity } = data
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL_API}/api/horisontal`, entity, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.status)
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
    builder.addCase(getAllHorizontalEntities.fulfilled, (state, action) => {
      state.allEntities = action.payload.data.data.value
    })
    builder.addCase(getAllHorizontalEntities.rejected, (state, action) => {
      state.error = `${action.payload}`
      openNotification({
        type: 'error',
        text: action.payload ? `${action.payload}` : 'Не удалось получить данные'
      })
    })
    builder.addCase(getEntityById.fulfilled, (state, action) => {
      state.entity = {
        id: '',
        name: '',
        about: {
          title: {
            img: '',
            name: '',
            number: ''
          },
          text: '',
          images: []
        }
      }

      state.entity.id = action.payload.data.data.value?.id
      state.entity.name = action.payload.data.data.value?.name
      state.entity.about.text = action.payload.data.data.value?.about?.text
      state.entity.about.title.name = action.payload.data.data.value?.about?.title?.name
      state.entity.about.title.img = action.payload.data.data.value?.about?.title?.img
      state.entity.about.title.number = action.payload.data.data.value?.about?.title?.number
      state.entity.about.images = action.payload.data.data.value?.about?.images
      state.loading = false
      state.error = ''
      state.status = 'succes'
    })
    builder.addCase(getEntityById.pending, (state) => {
      state.error = ''
      state.loading = true
      state.status = 'pending'
    })
    builder.addCase(getEntityById.rejected, (state, action) => {
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
        text: 'Данные успешно обновлены'
      })
    })
    builder.addCase(postEntity.pending, (state) => {
      state.error = ''
      state.loading = true
    })
    builder.addCase(postEntity.rejected, (state, action) => {
      state.loading = false
      // state.error = `${action.payload}`
      openNotification({
        type: 'error',
        text:
          action.payload === 400 ? `Все поля должны быть заполнены` : 'Не удалось обнавить данные'
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
