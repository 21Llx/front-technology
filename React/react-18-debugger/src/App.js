
import { useState } from "react";
function App() {
  // let {useState} = React
  let num = useState(100)
  return (
    <div className="App">
      asdqwewqe----{num}
    </div>
  );
}

// import * as React from "react"
// class App extends React.Component{
//   constructor(){
//     super()
//     this.state={
//       num1:1,
//       num2:2
//     }
//   }
//   componentDidMount(){
//     console.log("componentDidMount")
//   }
  
//   render(){
//     const {state} = this
//     return(
//       <div>
//         {state.num1}----{state.num2}
//       </div>
//     )
//   }
// }
export default App;
