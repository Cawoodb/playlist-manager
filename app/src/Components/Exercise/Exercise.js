import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchExercise, addSet, updateExercise } from '../../Store/Exercise/Actions';
import PropTypes from 'prop-types';
import Sets from './Sets';
import Exercises from './Exercises';

class Exercise extends Component {

  static get propTypes() {
    return {
        exercise: PropTypes.object,
        isLoading: PropTypes.bool,
        // fetchExercise: PropTypes.func,
        updateExercise: PropTypes.func,
        addSet: PropTypes.func
    };
  }   

  constructor(props) {
      super(props);

      this.state = {
          isLoading: props.isLoading || props.isLoading === undefined
      }

      this.updateExercise = this.updateExercise.bind(this);
  }

  componentDidMount() {
    // This method runs when the component is first added to the page
    //const exerciseName = "";
    // this.props.fetchExercise(exerciseName);
  }

  updateExercise(newValue, attributeToChange){
    let exerciseId = this.props.exercise.exerciseId;
    this.props.updateExercise(exerciseId, attributeToChange, newValue);
  }

  render() {
    let exercise = this.props.exercise;
    const TYPE = "type";
    const NAME = "name";

    return this.state.isLoading ? "Loading..." : (
      <div className="container">
        <div className="row">
          <input className="col s3 offset-s2" type="text" value={exercise.name} onChange={ (e) => this.updateExercise(e.target.value, NAME) } placeholder="Exercise Name"></input>
          <input className="col s3 offset-s1" type="text" value={exercise.type} onChange={ (e) => this.updateExercise(e.target.value, TYPE) }  placeholder="Exercise Type"></input>
        </div>
        <div className="row">
          <input type="button" onClick={() => this.props.addSet(exercise.exerciseId)} value="Add Set"></input>
          {/* <input type="button" value="Add Set"></input> */}
          <input type="button"></input> 
          <input type="button"></input>
        </div>
        <Sets sets={exercise.sets}/>
        <Exercises exercises={exercise.exercises}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    exercise: state.exercise.exercise,
    isLoading: state.exercise.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return{
    updateExercise: (exerciseId, attributeToChange, newValue) => dispatch(updateExercise(exerciseId, attributeToChange, newValue)),
    addSet: (exerciseId) => dispatch(addSet(exerciseId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Exercise);
