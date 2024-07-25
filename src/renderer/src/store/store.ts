import { combineReducers, configureStore } from '@reduxjs/toolkit'
import horizontalEntityReducer from './slices/horizontalEntitySlice'
import verticalEntityReducer from './slices/verticalEntitySlice'

const rootReducer = combineReducers({
  horizontalEntity: horizontalEntityReducer,
  verticalEntity: verticalEntityReducer
})

// @ts-ignore
export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
