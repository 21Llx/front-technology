import * as TYPES from "./action-types"

const delay = ()=>{
  return new Promise(resolve=>{
    setTimeout(()=>{
      resolve()
    },1000)
  })
}
const homeAction = {
  //用redux-thunk处理异步
  addNum(params){
    return async (dispatch)=>{
      await delay()
      dispatch ({
        type : TYPES.ADD_NUM,
        ...params
      })
    }
    
  },
  addCount(){
    return {
      type: TYPES.ADD_COUNT
    }
    
  }, 
  //用redux-promise处理异步
  async addCount2(){
    await delay()
    return {
      type: TYPES.ADD_COUNT
    }
  }
}
export default homeAction