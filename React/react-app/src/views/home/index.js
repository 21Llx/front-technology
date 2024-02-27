import HomeChild from "./homeChild"
import {connect} from "react-redux"
import action from "../../store/action"
import {bindActionCreators} from "redux"
function Home(props) {
let {count,num,addCount,addNum} = props
  return (
    <div>
      <h2>Home</h2>
      <h3>{num+count}</h3>
      <button onClick={()=>{
        addNum({num:3})
      }}>addNum</button>
      <button onClick={()=>{
        addCount()
      }}>addCount</button>
      {/* <HomeChild /> */}
    </div>


  )
}
export default connect(state=>{
  return state.home
},action.homeAction  //这种获取函数的方式 内部会自动调用 bindActionCreators 转换成 使用dispatch调用的形式
)(Home)

// export default connect(state=>{
//   return state.home
// },dispatch=>{
//   return {
//     addCount(){
//       dispatch(action.homeAction.addCount())
//     },
//     addNum(){
//       dispatch(action.homeAction.addNum())
//     }
//   }
// })(Home)