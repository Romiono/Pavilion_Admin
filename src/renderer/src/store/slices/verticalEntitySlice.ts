import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
import {openNotification} from "../../helpers/notification";

export interface IVerticalEntity {
  id: string | null,
  interval: {
    start: number | null,
    end: number | null,
  }
  header: {
    title: string,
    description: string
  },
  map: {
    background: string
  },
  text: string | null,
  secondLevel: {
    header: {
      title: string | null,
      description: string | null
    },
    background: string | null,
    thirdLevelBackground: string | null,
    map: {
      background: string | null
    },
    sources: {
      id: string | null,
      img: string | null,
      x: number | null,
      y: number | null,
      about: {
        number: number | null,
        main: {
          img: string | null,
          title: string | null
        },
        text: string | null,
        images: string[] | null
      }
    },
    text: string | null
  }
}

interface initialState {
  entity: IVerticalEntity | null,
  loading: boolean,
  error: string | null
}

const initialState: initialState = {
  entity: null,
  loading: false,
  error: null
}

export const getEntity = createAsyncThunk<any, any>(
  'horizontalEntity',
  // @ts-ignore
  async (_, {rejectWithValue}) => {
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
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getEntity.fulfilled, (state, action) => {
      state.entity = action.payload;
      state.loading = false;
      state.error = null;
    })
    builder.addCase(getEntity.pending, (state) => {
      state.error = null;
      state.loading = true;
    })
    builder.addCase(getEntity.rejected, (state, action) => {
      state.loading = false;
      state.error = `${action.payload}`;
      openNotification({
        type: 'error',
        text: `${action.payload}`
      })
    })
  }
})

export const {} = verticalEntitySlice.actions
export default verticalEntitySlice.reducer
