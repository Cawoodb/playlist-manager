import * as ActionTypes from './ActionTypes';


const initialExercise = { exerciseId: 0, name: "", type: "", sets: [], exercises: [], maxDatabaseId: 0 };
const initialState = { exercise: initialExercise, isLoading: false };

const exerciseReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.REQUEST_EXERCISE:{
            return {...state, isLoading: true };
        }
        case ActionTypes.RECEIVE_EXERCISE:{
            return {...state, exercise: action.exercise, isLoading: false };
        }
        case ActionTypes.UPDATE_EXERCISE:{
            let newExercise = {};
            if(action.exerciseId === state.exercise.exerciseId ){
                newExercise = {...state.exercise, [action.attributeToChange]: action.newValue };
                return {...state, exercise: newExercise}
            }
            else{
                let exercises = state.exercise.exercises.map( exercise => {
                    if(exercise.exerciseId === action.exerciseId){
                        newExercise = {...exercise, [action.attributeToChange]: action.newValue};
                        return newExercise;
                    }
                    else{
                        return exercise;
                    }
                });
                newExercise = {...state.exercise, exercises};
                return {...state, exercise: newExercise};
            }
        }
        case ActionTypes.ADD_SET:{
            let sets = [];
            if(action.exerciseId === state.exercise.exerciseId){
                sets = state.exercise.sets || [];
                let set = {name: "", minReps: 0, maxReps: 0, setId: sets.length || 0, exerciseId: action.exerciseId};
                sets.push(set);
                return {...state, exercise: {...state.exercise, sets: sets}};
            }
            else{
                 let exercises = state.exercise.exercises.map(exercise => {
                    if(exercise.exerciseId === action.exerciseId){
                        sets = exercise.sets || [];
                        let set = {name: "", minReps: 0, maxReps: 0, id: sets.length || 0, exerciseId: action.exerciseId};
                        sets.push(set);
                        return {...exercise, sets};
                    }
                    else{
                        return exercise;
                    }
                });
                return {...state, exercise: {...state.exercise, exercises}};
            }
        }
        case ActionTypes.UPDATE_SET:{
            let newExercise = {};
            let newSet = {};
            let sets = [];
            if(action.exerciseId === state.exercise.exerciseId ){
                sets = state.exercise.sets.map(set => {
                    if(set.setId === action.setId){
                        newSet = {...set, [action.attributeToChange]: action.newValue};
                        return newSet;
                    }
                    else{
                        return set;
                    }
                });
                newExercise = {...state.exercise, sets };
                return {...state, exercise: newExercise}
            }
            else{
                let exercises = state.exercise.exercises.map( exercise => {
                    if(exercise.exerciseId === action.exerciseId){
                        sets = state.exercise.sets.map(set => {
                            if(set.setId === action.setId){
                                newSet = {...set, [action.attributeToChange]: action.newValue};
                                return newSet;
                            }
                            else{
                                return set;
                            }
                        });
                        newExercise = {...exercise, sets};
                        return newExercise;
                    }
                    else{
                        return exercise;
                    }
                });
                newExercise = {...state.exercise, exercises};
                return {...state, exercise: newExercise};
            }
        }
        case ActionTypes.DELETE_SET:{
            let newExercise = {};
            let sets =[];
            if(action.exerciseId === state.exercise.exerciseId ){
                sets = state.exercise.sets.filter(set => set.setId !== action.setId);
                newExercise = {...state.exercise, sets };
                return {...state, exercise: newExercise}
            }
            else{
                let exercises = state.exercise.exercises.map( exercise => {
                    if(exercise.exerciseId === action.exerciseId){
                        sets = state.exercise.sets.filter(set => set.setId !== action.setId);
                        newExercise = {...exercise, sets};
                        return newExercise;
                    }
                    else{
                        return exercise;
                    }
                });
                newExercise = {...state.exercise, exercises};
                return {...state, exercise: newExercise};
            }
        }
        default: 
            return state;
    }
};

export default exerciseReducer;