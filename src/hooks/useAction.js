import {
  useCallback
} from 'react';
import {
  useDispatch
} from 'react-redux';

export default module => {
  const dispatch = useDispatch()
  return useCallback(value => dispatch(module(value)), [module, dispatch]);
}
