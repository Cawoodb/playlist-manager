import * as ActionTypes from './ActionTypes';


const initialExercise = { exerciseId: '000000000000000', name: "", type: "", sets: [], exercises: [], maxDatabaseId: 0 };
const initialState = { exercise: initialExercise, isLoading: false };

const alphanumToIndex = (alphanum) => {   
    return parseInt(alphanum, 36) - 1;
}; 

const indexToAlphanum = (index, exerciseTier) => {
    index = index + 1;
    index = index.toString(36);
    if(exerciseTier === 2 && index.length < 2){
        index = index + "0";
    }
    return index;
};

//change to accept function and array of possible parameters
const findExerciseAndExecuteFunctionOnIt = (topLevelExercise, exercises, targetExerciseId, functionToCall, functionParameters, exerciseTier) => {
    let tierOneExerciseIdPart =  targetExerciseId.substring(0,3);
    let tierOneExerciseId = tierOneExerciseIdPart + "00000";
    let tierTwoExerciseIdPart = targetExerciseId.substring(3, 5);
    let tierTwoExerciseId = tierOneExerciseIdPart + tierTwoExerciseIdPart + "000";
    let tierThreeExerciseIdPart = targetExerciseId.substring(5);
    let tierThreeExerciseId = tierOneExerciseIdPart + tierTwoExerciseIdPart + tierThreeExerciseIdPart + "00";
    let tierFourExerciseIdPart = targetExerciseId.charAt(6);
    let tierFourExerciseId = tierOneExerciseIdPart + tierTwoExerciseIdPart + tierThreeExerciseIdPart + tierFourExerciseIdPart + "0";
    let tierFiveExerciseIdPart = targetExerciseId.substring(7);
    let tierFiveExerciseId = tierOneExerciseIdPart + tierTwoExerciseIdPart + tierThreeExerciseIdPart + tierFourExerciseIdPart + tierFiveExerciseIdPart;

    let newTopLevelExercise = topLevelExercise;

    if(topLevelExercise.exerciseId === targetExerciseId){
        newTopLevelExercise = functionToCall(topLevelExercise, functionParameters);
    }
    else{
        exerciseTier = exerciseTier ? 2 : exerciseTier + 1;
        let currentTierParentExerciseId = "";

        switch(exerciseTier){
            case 2:
                currentTierParentExerciseId = tierTwoExerciseId;
                break;
            case 3:
                currentTierParentExerciseId = tierThreeExerciseId;
                break;
            case 4:
                currentTierParentExerciseId = tierFourExerciseId;
                break;
            case 5:
                currentTierParentExerciseId = tierFiveExerciseId;
                break;
            default:
                //display too deeply nested error to user
                return newTopLevelExercise;
        }

        exercises = exercises.map(exercise => {
            if(exercise.exerciseId === currentTierParentExerciseId){
                return findExerciseAndExecuteFunctionOnIt(exercise);
            }
            else{
                return exercise;
            }
        });

        newTopLevelExercise.exercises = exercises;
    }

    return newTopLevelExercise;
};

const exerciseReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_EXERCISE:{
            let userId = action.parentExerciseId.substring(0,7);
            let tierOneExerciseIdPart =  action.parentExerciseId.substring(7,10);
            let tierOneExerciseId = userId + tierOneExerciseIdPart + "00000";
            let tierTwoExerciseIdPart = action.parentExerciseId.substring(10, 12);
            let tierTwoExerciseId = userId + tierOneExerciseIdPart + tierTwoExerciseIdPart + "000";
            let tierThreeExerciseIdPart = action.parentExerciseId.substring(12);
            let tierThreeExerciseId = userId + tierOneExerciseIdPart + tierTwoExerciseIdPart + tierThreeExerciseIdPart + "00";
            let tierFourExerciseIdPart = action.parentExerciseId.charAt(13);
            let tierFourExerciseId = userId + tierOneExerciseIdPart + tierTwoExerciseIdPart + tierThreeExerciseIdPart + action.parentExerciseId.substring(13) + "0";
            let tierFiveExerciseIdPart = action.parentExerciseId.substring(14);
            let tierFiveExerciseId = userId + tierOneExerciseIdPart + tierTwoExerciseIdPart + tierThreeExerciseIdPart + tierFourExerciseIdPart + tierFiveExerciseIdPart;

            let exercises = [];
            let newExerciseIdPart ="";
            let newExerciseId = userId + tierOneExerciseIdPart;
            if(state.exercise.exercises.length == 0){
                newExerciseIdPart = "10";
                newExerciseId = newExerciseId + newExerciseIdPart + "000";
                exercises.push({...initialExercise, exerciseId: newExerciseId})
            }
            if(state.exercise.exerciseId === action.parentExerciseId){
                exercises = state.exercise.exercises;
                exercises.push();
                
            }
            else{
                exercises = state.exercises.map(exercise => {
                    if(exercise.exerciseId === tierTwoExerciseId){
                        // if(){
                            
                        // }
                        // else{
    
                        // }
                    }
                    else{
                        return exercise;
                    }
                });
            }
            return state;
        }
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
        default: 
            return state;
    }
};

export default exerciseReducer;