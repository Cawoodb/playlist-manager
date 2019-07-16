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
const findExerciseAndExecuteFunctionOnIt = (topLevelExercise, targetExerciseId, functionToCall, functionParameters, exerciseTier) => {
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
    let exercises = newTopLevelExercise.exercises;

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
                return findExerciseAndExecuteFunctionOnIt(exercise, targetExerciseId, functionToCall, functionParameters, exerciseTier);
            }
            else{
                return exercise;
            }
        });

        newTopLevelExercise.exercises = exercises;
    }

    return newTopLevelExercise;
};