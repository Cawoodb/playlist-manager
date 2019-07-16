import * as ActionTypes from './ActionTypes';


const initialExercise = { exerciseId: -1, name: "", type: "", sets: [], parentExerciseId: -1 };
const initialExercises = [];
initialExercises.push(initialExercise);
const initialState = { topLevelExercise: initialExercise, exercises: initialExercises, topLevelExerciseId: -1, isLoading: false };

const exerciseReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_EXERCISE:{
            //save new exercise to db and get the exercise id
            let newExerciseId = state.exercises.length;
            let exercises = state.exercises;
            exercises.push({...initialExercise, exerciseId: newExerciseId, parentExerciseId: action.parentExerciseId});
            return {...state, exercises};
        }
        case ActionTypes.REQUEST_EXERCISE:{
            return {...state, isLoading: true };
        }
        case ActionTypes.RECEIVE_EXERCISE:{
            return {...state, exercise: action.exercise, isLoading: false };
        }
        case ActionTypes.UPDATE_EXERCISE:{
            let newExercise = {};
            
            let exercises = state.exercise.exercises.map( exercise => {
                if(exercise.exerciseId === action.exerciseId){
                    newExercise = {...exercise, [action.attributeToChange]: action.newValue};
                    return newExercise;
                }
                else{
                    return exercise;
                }
            });

            return {...state, exercises};
            
        }
        case ActionTypes.ADD_SET:{
            let sets = [];

            let exercises = state.exercises.map(exercise => {
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
            return {...state, exercises};
            
        }
        case ActionTypes.DELETE_SET:{
            let newExercise = {};
            let sets =[];

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
            return {...state, exercises};
            
        }
        case ActionTypes.UPDATE_SET:{
            let newExercise = {};
            let newSet = {};
            let sets = [];

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

            return {...state, exercises};
            
        }
        default: 
            return state;
    }
};

export default exerciseReducer;