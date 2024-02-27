let initState = {
  name: "zd",
  age: 12,
}


export default function reducer(state = initState, action) {
  state = {...state}
  switch(action.type){
    case "SET":
      state.age +=10
      break;
  }
  return state
}
