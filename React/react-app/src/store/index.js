import { createStore, combineReducers, applyMiddleware } from "redux"
import reduxLogger from "redux-logger"
import reduxThunk from "redux-thunk"
import reduxPromise from "redux-promise"
let initState = {
  num: 10,
  count: 20
}

const reducer = function reducer(state = initState, action) {
  state = { ...state }
  switch (action.type) {
    case 'ADD_NUM':
      state.num += action.num
      break
    case 'ADD_COUNT':
      state.count++
      break
    default:
  }
  return state
}
let reducers = combineReducers({
  home: reducer
})
const store = createStore(
  reducers,
  applyMiddleware(reduxThunk,reduxPromise)
)
export default store