import React from "react"
import ThemeContext from "../../context"

class HomeChild extends React.Component{
  static contextType = ThemeContext
  render(){
    const {store} = this.context
    let {num,count} = store.getState()
    return (
      <div>
        <h2>HomeChild</h2>
        <h4>{num}----{count}</h4>
      </div>
    )
  }
  componentDidMount(){
    const {store} = this.context
    store.subscribe(()=>{
      this.forceUpdate()  //强制更新
    })
  }
}
export default HomeChild