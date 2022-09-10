// Router
// import { useParams } from "react-router-dom";
// Hooks
import useStore from '../../hooks/useStore';
import { actions, CounterStateType } from '../../store/reducer/counter';

// type Props ={};

const Todo = () => {
  // const { id } = useParams();
  const { state, dispatch } = useStore<CounterStateType>('counter');

  return (
    <div>
      <div>
        <button
          className="btn hover:--active mr-24"
          onClick={() => dispatch(actions.increment())}
        >
          Increment
        </button>
        <div className="text-5xl text-cyan-700">{state.value}</div>
        <button
          className="btn hover:--active"
          onClick={() => dispatch(actions.decrement())}
        >
          Decrement
        </button>
        <div />
        <button
          className="btn hover:--active"
          onClick={() => dispatch(actions.incrementByAmount(5))}
        >
          incrementByAmount
        </button>
      </div>
    </div>
  )
};

export default Todo;