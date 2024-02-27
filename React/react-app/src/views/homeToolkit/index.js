
import {useSelector,useDispatch} from "react-redux"
import {addCount,addNum,getAsyncNum} from "../../store-toolkit/features/numSlice"
function HomeToolkit(props) {
let {count,num} = useSelector(state=>state.numStore)
let dispatch = useDispatch()
  return (
    <div>
      <h2>Toolkit</h2>
      <h3>{num}---{count}</h3>
      <button onClick={()=>{
        dispatch(addNum(3))
      }}>addNum</button>
      <button onClick={()=>{
        dispatch(getAsyncNum())
      }}>addAsyncNum</button>
      <button onClick={()=>{
        addCount()
      }}>addCount</button>
    </div>


  )
}
export default HomeToolkit

