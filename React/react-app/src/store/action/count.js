import * as TYPES from "./action-types"
const delay = ()=>{
  return new Promise(resolve=>{
    resolve(2)
  })
}
const countAction = {
  addNum1(params){
    return {
      type: TYPES.ADD1
    }
  },
  addNum2(params){
    return {
      type: TYPES.ADD2,
      payload: params
    }
  },
  //redux-thunk
  asyncAddNum2Thunk(){ 
    return dispatch=>{
      delay().then(res=>{
        dispatch({
          type: TYPES.ADD2,
          payload: res
        })
      })
    }
  },
  // redux-promise
  async asyncAddNum2Promise(){
    let num = await delay()
    return{
      type: TYPES.ADD2,
      payload: num
    }
  }
}

export default countAction