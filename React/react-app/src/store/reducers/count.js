let initState = {
  num1: 1,
  num2: 10,
  num3: 100
}


export default function reducer(state = initState, action) {
  state = {...state}
  switch(action.type){
    case "ADD1":
      state.num1 +=1
      break;
    case "ADD2":
      state.num2 +=action.payload
      break;
  }
  return state
}
