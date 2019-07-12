export async function getExercise(exerciseName, callback){
    const url = `api/Exercise/GetExercise?exerciseName=${exerciseName}`;
    const response = await fetch(url);
    const exercise = await response.json();
    callback(exercise);
}