import React  from "react"
import {createBrowserHistory} from "history"
class RouterDom6 extends React.Component{
  constructor(props){
    super()
    this.state = {
      r:123,
      d: "qwewqe"
    }
  }
  handleR6(){
    this.setState({
      d: "ff"
    },()=>{
      console.log(this.state)
    })
  }
  render(){
    return(
      <div onClick={this.handleR6.bind(this)}>
        <h2>RouterDom6</h2>
      </div>
    ) 
  }
}
export default RouterDom6