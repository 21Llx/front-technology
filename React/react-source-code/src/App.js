import React from "react"
// import {flushSync} from "react-dom" //执行这个就会立即更新setState队列
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      num:0
    }
  }
  render(){
    const {state} = this
    
    return(
      <div>
        <h1>{state.num}</h1>
        <button onClick={()=>{
          this.setState({
            num: state.num+1
          })
          // this.state.num++
          // this.forceUpdate()
        }}>更新</button>
      </div>
    )
  }
}
export default App;
