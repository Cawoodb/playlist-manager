import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import exerciseReducer from './Exercise/ExerciseReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    exercise: exerciseReducer
});

export default rootReducer;