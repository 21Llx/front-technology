import { useState,useCallback,useMemo,useEffect } from "react"

function Child1(props){

  return (
    <div>
      <h3>Child1</h3>
      {/* <p>{props.num}</p> */}
    </div>
  )
}

function Test(){
  const [num,setNum] = useState(10)
  const [num2,setNum2] = useState(1)
  const [num3,setNum3] = useState(100)
  function add(){
    setNum(num+1)
  }
  function add2(){
    setNum2(num2+2)
  }
  function add3(){
    setNum3(num3+2)
  }
  let total = useMemo(()=>{
    return num+num2
  },[num,num2])
  return(
    <div>
      <h2>Test</h2>
      <p>{num}----{num2}---{total}</p>
      <p>{num3}</p>
      <button onClick={add}>add</button>
      <button onClick={add2}>add2</button>
      <button onClick={add3}>add3</button>
      <div>---------------</div>
      {/* <Child1  /> */}
    </div>
  )
}

export default Test