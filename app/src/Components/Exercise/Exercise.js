import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchExercise, addSet, updateExercise, addExercise } from '../../Store/Exercise/Actions';
import PropTypes from 'prop-types';
import Sets from './Sets';
import Exercises from './Exercises';

class Exercise extends Component {

  static get propTypes() {
    return {
        exercise: PropTypes.object,
        childExercises: PropTypes.array,
        isLoading: PropTypes.bool,
        // fetchExercise: PropTypes.func,
        updateExercise: PropTypes.func,
        addSet: PropTypes.func,
        addExercise: PropTypes.func,
        isLoading: PropTypes.bool
    };
  }   

  constructor(props) {
      super(props);

      this.state = {
        exercise: props.exercise,
        isLoading: !props.exercise,
        exercises: []
      }

      this.addExercise = this.addExercise.bind(this);
      this.updateExercise = this.updateExercise.bind(this);
      this.addSet = this.addSet.bind(this);
  }

  componentDidMount() {
    // This method runs when the component is first added to the page
    //const exerciseName = "";
    // this.props.fetchExercise(exerciseName);
    if(this.state.isLoading && this.props.exercise){
      this.setState({...this.state, isLoading: false});
    }
  }

  addExercise(){
    const initialExercise = { exerciseId: -1, name: "", type: "", sets: [], parentExerciseId: -1 };
    let newExerciseId = this.state.exercises.length;
    //call db add exercise and get id
    let exercises = this.state.exercises || [];
    exercises.push({...initialExercise, exerciseId: newExerciseId, parentExerciseId: this.state.exercise.exerciseId});
    this.setState({...this.state, exercises});
    console.log(this.state);
  }

  updateExercise(newValue, attributeToChange){
    let exercise = {...this.state.exercise, [attributeToChange]: newValue};
    this.setState({...this.state, exercise});
  }

  addSet(){
    let exercise = this.state.exercise;
    let sets = exercise.sets;
    let set = {name: "", minReps: 0, maxReps: 0, setId: sets.length || 0, exerciseId: exercise.exerciseId};
    sets.push(set);
    exercise = {...exercise, sets};
    this.setState({...this.state, exercise });
    //call db to add set and get id
  }

  render() {
    let exercise = this.state.exercise;
    const TYPE = "type";
    const NAME = "name";

    return this.state.isLoading ? "Loading..." : (
      <div className="container">
        <div className="row">
          <input className="col s3 offset-s2" type="text" value={exercise.name} onChange={ (e) => this.updateExercise(e.target.value, NAME) } placeholder="Exercise Name"></input>
          <input className="col s3 offset-s1" type="text" value={exercise.type} onChange={ (e) => this.updateExercise(e.target.value, TYPE) }  placeholder="Exercise Type"></input>
        </div>
        <div className="row">
          <input type="button" onClick={() => this.addSet()} value="Add Set"></input>
          {/* <input type="button" value="Add Set"></input> */}
          <input type="button" onClick={() => this.addExercise()} value="Add Exercise"></input> 
        </div>
        <Sets sets={exercise.sets}/>
        <Exercises exercises={this.state.exercises}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    isLoading: state.exercise.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return{
    addExercise: (parentExerciseId) => dispatch(addExercise(parentExerciseId)),
    updateExercise: (exerciseId, attributeToChange, newValue) => dispatch(updateExercise(exerciseId, attributeToChange, newValue)),
    addSet: (exerciseId) => dispatch(addSet(exerciseId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Exercise);
