import ThemeContext from "../../context"
import { useContext,useState,useEffect } from "react"
import HomeChild from "./homeChild"

function Home() {
  let { store } = useContext(ThemeContext)
  let {num,count} = store.getState()
  let [total,setTotal] = useState(0)
  const update =()=>{
    setTotal(total+1)
  }
  const update2 =()=>{
    setTotal(new Date())
  }
  // useEffect(()=>{
  //   let unsubscribe = store.subscribe(update)  //subscribe的返回值是一个清除当前事件的方法
  //   return ()=>{
  //     unsubscribe()
  //   }
  // },[total])
  useEffect(()=>{
    store.subscribe(update2)
  },[])
  return (
    <div>
      <h2>Home</h2>
      <h3>{num+count}</h3>
      <button onClick={()=>{
        store.dispatch({
          type: "ADD_NUM"
        })
      }}>addNum</button>
      <button onClick={()=>{
        store.dispatch({
          type: "ADD_COUNT"
        })
      }}>addCount</button>
      <HomeChild />
    </div>


  )
}
export default Home