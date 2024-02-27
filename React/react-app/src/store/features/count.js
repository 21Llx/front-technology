// createSlice 包含 reducer 和 action-creator
import {createSlice} from "@reduxjs/toolkit"

const countSlice = createSlice({
  name: "count",
  initialState: {
    count1: 1,
    count2: 10,
    count3: 100
  },
  reducers:{
    addCount1(state,action){
      state.count1 += action.payload
    },
    addCount2(state,action){
      state.count2 += action.payload.num
    },
    addCount3(state,action){
      state.count3 += action.payload
    }
  }
})
const delay = ()=>{
  return new Promise(resolve=>{
    setTimeout(()=>{
      resolve(1)
    },1000)
  })
}
export let  {addCount1,addCount2,addCount3} = countSlice.actions
export const asyncAddCount3 = ()=>{
  return dispatch=>{
    delay().then(res=>{
      dispatch(addCount3(res))
    })
  }
}
export default countSlice.reducer
