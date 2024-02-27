import { configureStore } from "@reduxjs/toolkit"
import countSlice from "./features/count"
const store = configureStore({
  reducer:{
    countStore: countSlice
  }
})
export default store