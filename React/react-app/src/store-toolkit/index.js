import { configureStore } from "@reduxjs/toolkit"
import reduxThunk from "redux-thunk"
import reduxLogger from "redux-logger"
import numSliceReducer from "./features/numSlice"
const store = configureStore({
  reducer: {
    numStore:numSliceReducer
  },
  //中间件 , 不指定默认集成了 redux-thunk
  middleware: [reduxLogger, reduxThunk]
})
export default store