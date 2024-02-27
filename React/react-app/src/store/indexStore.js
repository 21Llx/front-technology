import {createStore,combineReducers,applyMiddleware} from "redux"
import info from "./reducers/info"
import count from "./reducers/count"
import thunk from 'redux-thunk'
import reduxPromise from "redux-promise"
let reducers = combineReducers({
  info,count
})
let store = createStore(reducers,applyMiddleware(thunk,reduxPromise))

export default store