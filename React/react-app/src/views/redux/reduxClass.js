import React from "react"
import { connect } from "react-redux"
import action from "../../store/action"
class ReduxClass extends React.Component{
  constructor(){
    super()
    
    this.state = {
      name: "ReduxClass"
    }
  }
  add1 = ()=>{
    this.props.addNum1()
  }
  add2 = (x)=>{
    this.props.addNum2(x)
  }
  asyncAdd2Thunk = ()=>{
    this.props.asyncAddNum2Thunk()
  }
  render(){
    const {state,props} = this
    console.log(props)
    return (
      <div>
        <h2 >{state.name}</h2>
        <h3>{props.count.num1}---{props.count.num2}</h3>
        <button onClick={this.add1}>add1</button>
        <button onClick={this.add2.bind(this,2)}>add2</button>
        <button onClick={this.asyncAdd2Thunk}>asyncAdd2Thunk</button>
        <button onClick={props.asyncAddNum2Promise}>asyncAddNum2Promise</button>
        <h3 onClick={props.setAge}>info----{props.info.age}</h3>
      </div>
    )
  }
}
export default connect(state=>{
  return {
    info: state.info,
    count: state.count,
  }
},{
  ...action.countAction,
  ...action.infoAction
})(ReduxClass)

// export default connect(state=>{
//   return {
//     info: state.info,
//     count: state.count,
//   }
// },dispatch=>{
//   return{
//     addNum1(){
//       dispatch(action.countAction.addNum1()) 
//     },
//     addNum2(x){
//       dispatch(action.countAction.addNum2(x)) 
//     }
//   }
// })(ReduxClass)
