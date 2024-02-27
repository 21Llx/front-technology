import { useSelector, useDispatch } from "react-redux";
import { addCount1, addCount2,asyncAddCount3 } from "../../store/features/count";

function ReduxToolkit(props) {
  let { count1, count2, count3 } = useSelector((state) => state.countStore)
  let dispatch = useDispatch();
  
  return (
    <div>
      <h2>ReduxToolkit</h2>
      <h3>
        {count1}-----{count2}-----{count3}
      </h3>
      <button onClick={()=>dispatch(addCount1(2))}>add1</button>
      <button onClick={()=>dispatch(addCount2({num:5}))}>add2</button>
      <button onClick={()=>dispatch(asyncAddCount3())}>add3</button>
    </div>
  );
}

export default ReduxToolkit;
