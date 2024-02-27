// import logo from './logo.svg';
// import dayjs from 'dayjs';
import {
  useReducer,
  useState,
  useTransition,
  useEffect,
  useLayoutEffect,
  useInsertionEffect,
  useContext,
  createContext,
  useMemo,
  useCallback
} from "react";
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};
const ThemeContext = createContext(themes.light);
/* 用useContext方式 */
const DemoContext = () => {
  return (
    <div>
      <ThemedButton />
    </div>
  );
};
function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
function ShowNum(props,ref){
  console.log(ref)
  useEffect(()=>{
    let a = props.memoCallBack()
    console.log(a)

  },[props.num])
  return (
    <div>
      <h1>{props.num}</h1>
    </div>
  )
}
function Hook() {
  let [num, setNum] = useState(0);
  let handleNum = () => {
    setNum(num + 1);

    console.log(num);
  };

  let [state, setState] = useState({ name: "xx" });
  function handleState() {
    state.name = "ff";
    let state2 = { ...state };
    setState(state2);
  }
  // useReducer
  const [number, dispatchNumbner] = useReducer((state, action) => {
    const { payload, name } = action;
    /* return的值为新的state */
    switch (name) {
      case "add":
        return state + 1;
      case "sub":
        return state - 1;
      case "reset":
        return payload;
    }
    return state;
  }, 0);
  function handleDisNum() {
    dispatchNumbner({ name: "reset", payload: 12 });
  }
  // useTransition
  const  [ isPending , startTransition ] = useTransition ()
  let handleTr = ()=>{
    console.log(123)
    startTransition(()=>{
      console.log("callback")
      setNum(()=>{
        console.log("set")
        return 120
      })
      setNum(()=>{
        console.log("set2")
        return 220
      })
    })
    console.log(456)
  }
  // useEffect
  useEffect(() => {
    console.log("useEffect");
    console.log(num);
    console.log(isPending)
    return () => {
      console.log("clean");
    };
  }, [num]);
  // useEffect(()=>{
  //   console.log("useEffect2222")
  //   return ()=>{
  //     console.log("clean2222")
  //   }
  // })

  // useLayoutEffect
  useLayoutEffect(() => {
    console.log("useLayoutEffect");
  }, []);
  // useInsertionEffect
  useInsertionEffect(() => {
    console.log("useInsertionEffect");
  }, []);

  // useContext

  // useCallback
  const memoCallBack = useCallback(()=>{
    console.log("memoCallBack")
    return "xxxx"
  },[num])
  //useMemo 
  useMemo(()=>{
    return ()=>{
      console.log("useMemo")
    }
  },[num])
  return (
    <div className="Hook">
      <div>{num}</div>
      <button onClick={handleNum}>click</button>
      <div>{state.name}</div>
      <button onClick={handleState}>click2</button>
      <div>{number}</div>
      <button onClick={handleDisNum}>click3</button>
      
      {isPending && <div>xxxx</div> }
      <button onClick={handleTr}>click4</button>
      <ThemeContext.Provider value={themes.dark}>
        <DemoContext />
      </ThemeContext.Provider>
      <ShowNum memoCallBack={memoCallBack} num={num}></ShowNum>
    </div>
  );
}

export default Hook;
