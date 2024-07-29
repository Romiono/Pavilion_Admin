import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import openNotification from '../../helpers/notification'

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
    sources: {
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
    text: string
  }
}

interface initialState {
  entity: IVerticalEntity
  loading: boolean
  error: string
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
      sources: {
        about: {
          number: '',
          main: {
            img: '',
            title: ''
          },
          text: '',
          images: []
        }
      },
      text: ''
    }
  },
  loading: false,
  error: ''
}

export const getEntity = createAsyncThunk<any, any>(
  'verticalEntity/get',
  // @ts-ignore
  async (index, { rejectWithValue }) => {
    try {
      const data = await axios.get(`${import.meta.env.VITE_BASE_URL_API}/vertical/${index}`)
      return data
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
    const { entity, index } = data
    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL_API}/horizontal/${index}`, entity, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      dispatch(getEntity(index))
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
      state.entity.secondLevel.sources.about.number = action.payload
    },
    setSecondLevelSourcesAboutText: (state, action) => {
      state.entity.secondLevel.sources.about.text = action.payload
    },
    setSecondLevelSourcesAboutMainTitle: (state, action) => {
      state.entity.secondLevel.sources.about.main.title = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getEntity.fulfilled, (state, action) => {
      state.entity = action.payload
      state.loading = false
      state.error = ''
    })
    builder.addCase(getEntity.pending, (state) => {
      state.error = ''
      state.loading = true
    })
    builder.addCase(getEntity.rejected, (state, action) => {
      state.loading = false
      state.error = `${action.payload}`
      openNotification({
        type: 'error',
        text: action.payload ? `${action.payload}` : 'Ошибка'
      })
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
        text: action.payload ? `${action.payload}` : 'Ошибка'
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
