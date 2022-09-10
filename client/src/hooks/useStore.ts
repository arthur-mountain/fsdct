import { useDispatch, useSelector } from 'react-redux'
import type { Store, Dispatch } from '../store/store';

type ReturnVal<T> = {
  state: T;
  dispatch: Dispatch;
}

function useStore<State>(stateName: keyof Store): ReturnVal<State> {
  const state = useSelector<Store>(store => store[stateName] || {}) as State;

  return { state, dispatch: useDispatch() }
}

export default useStore;