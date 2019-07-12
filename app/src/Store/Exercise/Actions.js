import * as ActionTypes from "./ActionTypes";
import * as Service from "./Service";

const requestExercise = () => ({
   type: ActionTypes.REQUEST_EXERCISE
});

const receiveExercise = (exercise) => ({
   type: ActionTypes.RECEIVE_EXERCISE,
   exercise
});

export const fetchExercise = (exerciseName)  => (dispatch) => {
   dispatch(requestExercise());
   return Service.getExercise(exerciseName, (exercise) => {
      dispatch(receiveExercise(exercise));
   });
};

export const addSet = (exerciseId) => ({
   type: ActionTypes.ADD_SET,
   exerciseId
});

export const updateExercise = (exerciseId, attributeToChange, newValue) => ({
   type: ActionTypes.UPDATE_EXERCISE,
   exerciseId,
   attributeToChange,
   newValue
});

export const updateSet = (exerciseId, setId, attributeToChange, newValue) => ({
   type: ActionTypes.UPDATE_SET,
   exerciseId,
   setId,
   attributeToChange,
   newValue
});

export const deleteSet = (exerciseId, setId) => ({
   type: ActionTypes.DELETE_SET,
   exerciseId,
   setId
});

