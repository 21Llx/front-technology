// createSlice 包含 reducer 和 action-creator
import {createSlice} from "@reduxjs/toolkit"

const numSlcie = createSlice({
  name: "num",
  //设置reducer的初始状态
  initialState: {
    num: 10,
    count: 20
  },
  reducers:{
    addNum(state,action){
      state.num += action.payload 
    },
    addCount(state,action){
      state.count += action.payload 
    }
  }
})

const delay = ()=>{
  return new Promise(resolve=>{
    setTimeout(()=>{
      resolve(4)
    },1000)
  })
}

export let {addCount,addNum} = numSlcie.actions


// 异步派发 =》 redux-thunk

export const getAsyncNum = ()=>{
  return async (dispatch)=>{
    let res = await delay()
    console.log(res)
    dispatch(addNum(res))
  }
}


export default numSlcie.reducer


