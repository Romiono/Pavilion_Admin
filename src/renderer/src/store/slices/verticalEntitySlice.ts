import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import openNotification from '../../helpers/notification'
import IAllEnttities from '../../types/IAllEntities'

export interface IVerticalEntity {
  id: string
  header: {
    title: string
    description: string
  }
  text: string
  secondLevel: {
    header: {
      title: string
      description: string
    }
    sources: [
      {
        about: {
          number: string
          main: {
            img: string
            title: string
          }
          text: string
          images: string[]
        }
      }
    ]
    text: string
  }
}

interface initialState {
  entity: IVerticalEntity
  allEntities: IAllEnttities[]
  loading: boolean
  error: string
  status: string
}

const initialState: initialState = {
  entity: {
    id: '',
    header: {
      title: '',
      description: ''
    },
    text: '',
    secondLevel: {
      header: {
        title: '',
        description: ''
      },
      sources: [
        {
          about: {
            number: '',
            main: {
              img: '',
              title: ''
            },
            text: '',
            images: []
          }
        }
      ],
      text: ''
    }
  },
  allEntities: [],
  loading: false,
  error: '',
  status: ''
}

export const getAllVerticalEntities = createAsyncThunk<any>(
  'verticalEntities/getAllEntities',
  // @ts-ignore
  async (_, { rejectWithValue }) => {
    try {
      const data = await axios.get(`${import.meta.env.VITE_BASE_URL_API}/api/vertical`)
      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      }
    }
  }
)

export const getEntityById = createAsyncThunk<any, any>(
  'verticalEntity/get',
  // @ts-ignore
  async (data, { rejectWithValue }) => {
    try {
      const { period, id } = data
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL_API}/api/vertical/${id}/${period}`
      )
      return response
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data?.message)
      }
    }
  }
)

export const postEntity = createAsyncThunk<any, any>(
  'verticalEntity/post',
  // @ts-ignore
  async (data, { rejectWithValue, dispatch }) => {
    const { entity, period, id } = data
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL_API}/api/vertical/${id}/${period}`,
        entity,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      dispatch(getEntityById(period))
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      }
    }
  }
)

export const verticalEntitySlice = createSlice({
  name: 'verticalEntity',
  initialState,
  reducers: {
    setEntity: (state, action) => {
      const data: IVerticalEntity = action.payload
      state.entity.id = data.id
      state.entity.header = data.header
      state.entity.text = data.text
      state.entity.secondLevel
    },
    setHeaderTitle: (state, action) => {
      state.entity.header.title = action.payload
    },
    setHeaderDescription: (state, action) => {
      state.entity.header.description = action.payload
    },
    setText: (state, action) => {
      state.entity.text = action.payload
    },
    setSecondLevelHeaderTitle: (state, action) => {
      state.entity.secondLevel.header.title = action.payload
    },
    setSecondLevelHeaderDescription: (state, action) => {
      state.entity.secondLevel.header.description = action.payload
    },
    setSecondLevelText: (state, action) => {
      state.entity.secondLevel.text = action.payload
    },
    setSecondLevelSourcesAboutNumber: (state, action) => {
      state.entity.secondLevel.sources[action.payload.index].about.number = action.payload.data
    },
    setSecondLevelSourcesAboutText: (state, action) => {
      state.entity.secondLevel.sources[action.payload.index].about.text = action.payload.data
    },
    setSecondLevelSourcesAboutMainTitle: (state, action) => {
      state.entity.secondLevel.sources[action.payload.index].about.main.title = action.payload.data
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllVerticalEntities.fulfilled, (state, action) => {
      state.allEntities = action.payload.data.data.value
    })
    builder.addCase(getAllVerticalEntities.rejected, (state, action) => {
      state.error = `${action.payload}`
      openNotification({
        type: 'error',
        text: action.payload ? `${action.payload}` : 'Не удалось получить данные'
      })
    })
    builder.addCase(getEntityById.fulfilled, (state, action) => {
      state.entity = action.payload.data.data.value
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
        text: 'Данные вертикальной модели успешно обновлены'
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
        text: action.payload ? `${action.payload}` : 'Не удалось обновить данные'
      })
    })
  }
})

export const {
  setSecondLevelSourcesAboutMainTitle,
  setSecondLevelSourcesAboutNumber,
  setSecondLevelSourcesAboutText,
  setSecondLevelHeaderTitle,
  setSecondLevelHeaderDescription,
  setHeaderTitle,
  setSecondLevelText,
  setHeaderDescription,
  setText,
  setEntity
} = verticalEntitySlice.actions

export default verticalEntitySlice.reducer
