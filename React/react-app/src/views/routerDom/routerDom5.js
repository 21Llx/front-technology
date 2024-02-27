import React  from "react"

class RouterDom6 extends React.Component{
  handleR6(){
    console.log(this.props)
    // let nav = useNavigate()
    this.props.nav("/route6",{
      state:{
        a:1,b:2
      },
      params: {xx:33}
    })
  }
  render(){
    return(
      <div onClick={this.handleR6.bind(this)}>
        <h2>RouterDom5</h2>
      </div>
    ) 
  }
}
export default RouterDom6