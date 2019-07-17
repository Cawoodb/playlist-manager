import * as ActionTypes from "./ActionTypes";
import * as Service from "./Service";

export const fetchExercise = (exerciseName)  => (dispatch) => {
   dispatch(requestExercise());
   return Service.getExercise(exerciseName, (exercise) => {
      dispatch(receiveExercise(exercise));
   });
};

const requestExercise = () => ({
   type: ActionTypes.REQUEST_EXERCISE
});

const receiveExercise = (exercise) => ({
   type: ActionTypes.RECEIVE_EXERCISE,
   exercise
});

