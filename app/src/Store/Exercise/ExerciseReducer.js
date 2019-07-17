import * as ActionTypes from './ActionTypes';


const initialExercise = { exerciseId: -1, name: "", type: "", sets: [], parentExerciseId: -1 };
const initialExercises = [];
initialExercises.push(initialExercise);
const initialState = { topLevelExercise: initialExercise, exercises: initialExercises, topLevelExerciseId: -1, isLoading: false };

const exerciseReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.REQUEST_EXERCISE:{
            return {...state, isLoading: true };
        }
        case ActionTypes.RECEIVE_EXERCISE:{
            return {...state, exercise: action.exercise, isLoading: false };
        }
        default: 
            return state;
    }
};

export default exerciseReducer;