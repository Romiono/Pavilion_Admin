import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { openNotification } from '../../helpers/notification'

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
  'verticalEntity',
  // @ts-ignore
  async (_, { rejectWithValue }) => {
    try {
      const data = await axios.get(`https://localhost:8080`)
      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data?.message)
      }
    }
  }
)

export const verticalEntitySlice = createSlice({
  name: 'verticalEntity',
  initialState,
  reducers: {},
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
        text: `${action.payload}`
      })
    })
  }
})

export const {} = verticalEntitySlice.actions
export default verticalEntitySlice.reducer
