import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
import horizontalEntity from "../../types/horizontalEntity";
import {openNotification} from "../../helpers/notification";

interface initialState {
  entity: horizontalEntity | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialState = {
  entity: null,
  loading: false,
  error: null,
}

export const getEntity = createAsyncThunk<any, any>(
  'horizontalEntity',
  // @ts-ignore
  async (payload, {rejectWithValue}) => {
    try {
      const data = await axios.get(`https://localhost:8080/${payload}`)
      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data?.message)
      }
    }
  }
)

export const horizontalEntitySlice = createSlice({
  name: "horizontalEntity",
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
